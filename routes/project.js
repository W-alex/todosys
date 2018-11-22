const express = require("express")
const router = express.Router()
const Api = require("../api/project")

router.get('/', Api.getAll)

router.get("/:id", Api.get)

router.get("/mumbers/:userid", Api.getByUserID)

router.post("/", Api.add)

router.post("/numbers", Api.changeNumber)

//TODO 删除项目 应该删除项目组中所有的todolist
router.delete("/:id", Api.delete)

module.exports = router