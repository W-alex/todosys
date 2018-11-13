const express = require("express")
const router = express.Router()
const Project = require("../model/project")

var responseData = {}
router.use((req, res, next) => {
  responseData = {
    message: "",
    code: 0
  }
  next()
})

router.get('/', (req, res, next) => {
  Project.find().sort({
    datetime: -1
  }).exec((err, data) => {
    res.json(data)
  })
})

router.get("/:id", (req, res, next) => {
  const id = req.params.id
  Project.findById(id).populate("numbers", "username")
    .populate("charger", "username").exec((err, data) => {
      if (err) {
        next(err)
      }
      res.json(data)
    })
})

router.post("/", (req, res) => {
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
})

router.post("/add", (req, res) => {
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
})

//TODO 删除项目 应该删除项目组中所有的todolist
router.delete("/:id", (req, res) => {
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
})

module.exports = router