const Project = require("../model/project")
const Todo = require("../model/todo")
const util = require("../util")

Project.prototype.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    datetime: util.dateFormat(this.datetime)
  }
}

let responseData = {
  code: 0,
  message: ""
}
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
/**
 * 根据project id和userid 返回 除了userid 所有的参与项目人员信息「username， _id」
 */
exports.get = function (req, res, next) {
  const id = req.params.id
  const userid = req.query.userid
  Project.findById(id).populate("numbers", "username")
    .populate("charger", "username").exec((err, data) => {
      if (err) {
        next(err)
      }
      console.log(data)
      data.numbers.push(data.charger);
      console.log(data.numbers)
      res.json(data.numbers.filter(item => {
        return item._id != userid
      }))
    })
}
/**
 * 查找有userid 参与的项目：项目负责人 or 项目成员
 */
exports.getByUserID = function (req, res, next) {
  const userid = req.params.userid
  Project.find({
    $or: [{
        'numbers': {
          $elemMatch: {
            $eq: userid
          }
        }
      },
      {
        'charger': userid
      },
    ]
  }).exec((err, data) => {
    if (err) {
      console.log(err)
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
    charger: req.body.charger,
    numbers: req.body.numbers,
    name: req.body.name
  })
  project.save().then(data => {
    if (!data) {
      responseData.code = 500
      res.json(responseData)
    }
    responseData.code = 200
    res.json(responseData)
  })
}

exports.changeNumber = function (req, res, next) {
  const addNumbers = req.body.addMumber
  const removeNumbers = req.body.removeMumber
  const id = req.body.projectid
  Project.findById(id).exec((err, data) => {
    if (err) next(err)
    if (!data) {
      responseData.code = 404
      res.json(responseData)
    }
    // TODO 
    // 后台需要判断 当前用户是否是“项目负责人” 只有“项目负责人”才能够修改项目人员
    removeNumbers.forEach(item => {
      data.numbers.splice(data.numbers.indexOf(item), 1)
    })
    data.numbers = data.numbers.concat(addNumbers)
    data.save().then((project) => {
      console.log(project)
      responseData.code = 200
      res.json(responseData)
    }).catch(err => {
      next(err)
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
  }).then(data => {
    if (!data) {
      responseData.code = 404
      res.json(responseData)
    }
    return Todo.deleteMany({
      project: id
    })
  }).then(data => {
    responseData.code = 200
    res.json(responseData)
  }).catch(err => {
    next(err)
  })
}