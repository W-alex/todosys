const Notice = require("../model/notice")
const util = require("../util")
let responseData

Notice.prototype.toJSON = function () {
  return {
    from: this.from.username || "null",
    to: this.to.username || "null",
    todo: this.todo.todoStr || "null"
  }
}
//将notice 转换成 todo的形式
function noticeFormat(data) {
  console.log(data)
  return data.map(item => {
    return {
      todostr: "from:" + item.from.username + "," + item.todo.todoStr,
      datetime: util.dateFormat(item.todo.datetime),
      finish: item.todo.finish,
      priority: false, //在通知界面不显示 priority 因此为false
    }
  })
}

exports.count = function (req, res, next) {
  const userid = req.params.id
  Notice.count({
    to: userid
  }).then(data => {
    res.json(data)
  }).catch(err => {
    next(err)
  })
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
    .populate("todo")
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