const express = require("express")
const router = express.Router()
const Todo = require('../model/todo')
const utils = require("../util")
const Notice = require("../model/notice")

let responseData;

const TODOSORT = {
  datetime: -1,
  priority: -1,
  finish: -1
}

verifyTodo = function (req, res, next) {
  const todostr = req.body.todostr
  if (todostr.trim().length === 0) {
    next(err)
  }
  next()
}

todoFormat = (todos) => {
  return todos.map(item => {
    return {
      datetime: utils.dateFormat(item.datetime),
      todostr: item.todoStr,
      finish: item.finish,
      priority: item.priority,
      id: item._id
    }
  })
}

/**
 * 确定返回格式
 * post 方式返回 responseData
 * get 方式直接返回数据
 */
router.use(function (req, res, next) {
  responseData = {
      code: 0,
      message: ""
    },
    next();
})

/**
 * 返回指定用户的todolist
 */
router.get("/", function (req, res, next) {
  const userid = req.query.id;
  Todo.find({
    user: userid
  }).sort(TODOSORT).exec((err, data) => {
    if (err) next(err)
    res.json(todoFormat(data))
  })
})

/**
 * add todo
 * route
 * 验证函数
 * 添加todo的异步函数
 * 获取todolist 的异步函数
 */
router.post("/", verifyTodo, function (req, res, next) {
  console.log(req.body)
  const todo = new Todo({
    todoStr: req.body.todostr,
    user: req.body.user,
  });
  todo.save().then(data => {
    if (!data) {
      responseData.code = 500
      responseData.message = "internal error!"
      res.json(responseData)
    }
    // 添加通知
    console.log(data)
    if (req.body.notice) {
      const notice = new Notice({
        to: req.body.notice,
        from: req.body.user,
        todo: data._id
      })
      notice.save().then(data => {
        if (!data) {
          responseData.code = 500
          res.json(res)
        }
        next()
      })
    } else {
      next()
    }
  })
}, function (req, res) {
  const userid = req.body.user
  Todo.find({
    user: userid
  }).sort(TODOSORT).exec((err, data) => {
    if (err) {
      responseData.code = 500
      responseData.message = err
    } else {
      responseData.code = 200
      responseData.message = todoFormat(data)
    }
    res.json(responseData)
  })
})

/**
 * 更改某一个todo的finish状态
 */
router.post("/done", function (req, res, next) {
  const id = req.body.todo;
  console.log(id);
  Todo.findById(id).then(data => {
    if (!data) {
      responseData.code = 404
      responseData.message = ""
      res.json(responseData)
    }
    data.finish = !data.finish
    return data.save();
  }).then(data => {
    responseData.code = 200
    responseData.message = data
    res.json(responseData)
  }).catch(err => {
    responseData.code = 500
    responseData.message = err
    res.json(responseData)
  })
})

/**
 * todo 置顶
 */
router.post("/priority", function (req, res, next) {
  const id = req.body.id;
  Todo.findById(id).then(todo => {
    if (!todo) {
      responseData.code = 404;
      responseData.message = "该条目不存在，请重试！"
      res.json(responseData)
    } else {
      todo.priority = true;
      return todo.save();
    }
  }).then(data => {
    responseData.code = 200;
    res.json(responseData)
  })

})

/**
 * 删除 todo
 */
router.delete("/", function (req, res, next) {
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
})

/**
 * 删除已完成
 */
router.delete('/finish', function (req, res, next) {
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
})

module.exports = router