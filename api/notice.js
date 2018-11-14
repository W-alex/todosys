const Notice = require("../model/notice")

let responseData

Notice.prototype.toJSON = function () {
  return {
    from: this.from.username || "null",
    to: this.to.username || "null",
    todo: this.todo.todoStr || "null"
  }
}

exports.count = function (req, res, next) {

}

exports.getAll = function (req, res, next) {
  Notice.find().populate('to', 'username')
    .populate('from', 'username')
    .populate('todo', 'todoStr')
    .exec((err, data) => {
      if (err) {
        next(err)
      }
      res.json(data)
    })
}

exports.getByReciever = function (req, res, next) {
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
}

exports.add = function (req, res, next) {
  const fromid = req.body.from
  const toid = req.body.to
  const todoid = req.body.todo

  const notice = new Notice({
    from: fromid,
    to: toid,
    todo: todoid
  })
  notice.save().exec((err, data) => {
    if (err) {
      next(err)
    }
    if (data) {
      responseData.code = 200
      res.json(responseData)
    }
  })
}