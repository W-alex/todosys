const express = require("express")
const router = express.Router()
const TodoApi = require("../api/todo")

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
router.get("/:id", function (req, res) {
  const userid = req.params.id
  TodoApi.getByUser(res, userid)
})

/**
 * add todo
 * route
 * 验证函数
 * 添加todo的异步函数
 * 获取todolist 的异步函数
 */
router.post("/", TodoApi.verifyTodo, TodoApi.add, function (req, res) {
  const userid = req.body.user
  TodoApi.getByUser(res, userid)
})

/**
 * 更改某一个todo的finish状态
 */
router.post("/done", TodoApi.done)

/**
 * todo 置顶
 */
router.post("/priority", TodoApi.priority)

/**
 * 删除 todo
 */
router.delete("/", TodoApi.delete)

/**
 * 删除已完成
 */
router.delete('/finish', TodoApi.deleteFinish)

module.exports = router