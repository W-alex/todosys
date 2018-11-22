const express = require('express')
const router = express.Router();
const Api = require("../api/notice")

let responseData = {}

router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ""
  }
  next()
})

router.post("/", Api.add)

router.get("/:id", Api.getByReciever)

router.get("/", Api.getAll)

router.get("/count/:id", Api.count)

module.exports = router