const Project = require("../model/project")
const util = require("../util")
Project.prototype.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    datetime: util.dateFormat(this.datetime)
  }
}

let responseData
const SORT = {
  datetime: -1
}

/**
 * GET
 */
exports.getAll = function (req, res, next) {
  Project.find().sort(SORT).exec((err, data) => {
    res.json(data)
  })
}

exports.get = function (req, res, next) {
  const id = req.params.id
  Project.findById(id).populate("numbers", "username")
    .populate("charger", "username").exec((err, data) => {
      if (err) {
        next(err)
      }
      res.json(data)
    })
}

/**
 * POST
 */
exports.add = function (req, res, next) {
  const project = new Project({
    charger: req.body.user,
    numbers: req.body.numbers,
    name: req.body.name
  })
  project.save().then(data => {
    if (!data) {
      responseData.code = 500
      res.json(responseData)
    }
    responseData.code = 200
    responseData.message = data
    res.json(responseData)
  })
}

exports.addNumber = function (req, res, next) {
  const addNumbers = req.body.numbers
  const id = req.body.id
  Project.findById(id).exec((err, data) => {
    if (err) next(err)
    if (data) {
      responseData.code = 404
      res.json(responseData)
    }
    data.numbers.concat(addNumbers)
    data.save().populate("numbers", "username")
      .populate("charger", "username").exec((err, data) => {
        if (err) {
          next(err)
        }
        responseData.code = 200
        responseData.message = data
        res.json(responseData)
      })
  })
}

/**
 * DELETE
 */
exports.delete = function (req, res, next) {
  const id = req.params.id
  Project.deleteOne({
    _id: id
  }).exec((err, data) => {
    if (err || !data) {
      responseData.code = 500
      res.json(responseData)
    }
    responseData.code = 200
    res.json(responseData)
  })
}