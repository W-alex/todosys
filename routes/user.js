const express = require('express')
const router = express.Router();
const User = require('../model/user')
const Api = require("../api/user")

router.use((req, res, next) => {
  responseData = {
    code: 0,
    message: ""
  }
  next()
})

router.get("/list", Api.getAll)

router.get("/other", Api.getOther)

module.exports = router