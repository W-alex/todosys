const express = require('express')
const router = express.Router();
const Notice = require('../model/notice')

let responseData = {}

noticeFormat = (notices) => {
  return notices.map(item => {
    return {
      from: item.from.username || "null",
      to: item.to.username || "null",
      todo: item.todo.todoStr || "null"
    }
  })
}

router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ""
  }
  next()
})

router.post("/", function (req, res, next) {
  const fromid = req.body.from
  const toid = req.body.to
  const todoid = req.body.todo

  const notice = new Notice({
    from: fromid,
    to: toid,
    todo: todoid
  })
  notice.save().then(data => {
    if (data) {
      responseData.code = 200
      res.json(responseData)
    }
  })
})

router.get("/:id", function (req, res, next) {
  const userid = req.params.id
  Notice.find({
      to: userid
    }).populate('from', "username")
    .populate("to", "username")
    .populate("todo", "todoStr")
    .exec((err, data) => {
      if (err) {
        next(err)
      } else {
        res.json(noticeFormat(data))
      }
    })
})

router.get("/", function (req, res, next) {
  Notice.find().populate('to', 'username')
    .populate('from', 'username')
    .populate('todo', 'todoStr')
    .exec((err, data) => {
      if (err) {
        next(err)
      }
      res.json(noticeFormat(data))
    })
})

router.use((err, req, res, next) => {
  responseData.code = 500
  responseData.message = "内部错误"
  res.json(responseData)
})

module.exports = router