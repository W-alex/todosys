const Todo = require("../model/todo")
const Notice = require("../model/notice")
const util = require("../util")

let responseData = {}

const TODOSORT = {
  priority: -1,
  datetime: -1,
  finish: -1
}
/**
 * PRIVATE
 */
Todo.prototype.toJSON = function () {
  return {
    id: this._id,
    datetime: util.dateFormat(this.datetime),
    todostr: this.todoStr,
    finish: this.finish,
    priority: this.priority,
  }
}

/**
 * PUBLIC
 * GET
 */
exports.verifyTodo = function (req, res, next) {
  const todostr = req.body.todostr
  if (todostr.trim().length === 0) {
    next(err)
  }
  next()
}

exports.getAll = function (req, res, next) {
  Todo.find().sort(TODOSORT).exec((err, data) => {
    if (err) next(err)
    res.json(data)
  })
}

exports.getByUserAndProject = function (res, userid, projectid, next) {
  Todo.find({
    user: userid,
    project: projectid
  }).sort(TODOSORT).exec((err, data) => {
    if (err) {
      next(err)
    } else {
      responseData.code = 200
      responseData.message = data
    }
    res.json(responseData)
  })
}

/**
 * POST
 */
exports.add = function (req, res, next) {
  console.log(req.body)
  const todo = new Todo({
    todoStr: req.body.todostr,
    user: req.body.user,
    project: req.body.project,
    datetime: new Date()
  });
  todo.save().then((data) => {
    // 添加通知
    if (req.body.notice) {
      let noticeList = []
      req.body.notice.forEach(element => {
        noticeList.push(new Notice({
          to: element,
          from: req.body.user,
          todo: data._id
        }))
      });
      console.log(noticeList + "!!!!!!!!!!!!!!!")
      Notice.insertMany(noticeList).then((data) => {
        console.log(data)
        next()
      }).catch(err => {
        next(err)
      })
    } else {
      next()
    }
  })
}

exports.priority = function (req, res, next) {
  const id = req.body.id;
  Todo.findById(id).then(todo => {
    if (!todo) {
      responseData.code = 404;
      responseData.message = "该条目不存在，请重试！"
      res.json(responseData)
    } else {
      todo.priority = !todo.priority;
      return todo.save();
    }
  }).then(data => {
    responseData.code = 200;
    res.json(responseData)
  })
}

exports.done = function (req, res, next) {
  const id = req.body.todo;
  console.log(id);
  Todo.findById(id).then(data => {
    if (!data) {
      responseData.code = 404
      responseData.message = ""
      res.json(responseData)
    }
    data.finish = !data.finish
    if (data.priority) {
      data.priority = false
    }
    return data.save();
  }).then((data) => {
    responseData.code = 200
    responseData.message = data
    res.json(responseData)
  })
}

/**
 * DELETE
 */
exports.delete = function (req, res, next) {
  const id = req.query.id;
  Todo.deleteOne({
    _id: id
  }).then(data => {
    responseData.code = 200;
    res.json(responseData)
  }).catch((err) => {
    responseData.code = 500;
    responseData.message = "删除失败，请重试！"
    res.json(responseData)
  })
}

exports.deleteFinish = function (req, res, next) {
  Todo.deleteMany({
    finish: true,
    user: req.query.id
  }).then(data => {
    responseData = 200;
    res.json(responseData)
  }).catch(err => {
    responseData.code = 500;
    responseData.message = "批量删除失败！"
    res.json(responseData)
  })
}