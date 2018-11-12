const express = require('express')
const router = express.Router();
const User = require('../model/user')

function userFormat(users) {
  return users.map(item => {
    return {
      id: item._id,
      username: item.username
    }
  })
}

let responseData
router.use((req, res, next) => {
  responseData = {
    code: 0,
    message: ""
  }
  next()
})

router.get("/list", function (req, res, next) {
  User.find().then(users => {
    usernameList = users.map(item => {
      return {
        username: item.username,
        id: item._id
      }
    })
    res.json(usernameList)
  })
})

router.get("/other", function (req, res) {
  const id = req.query.id;
  User.find().ne('_id', id).exec((err, data) => {
    if (err) {
      throw err
    }
    res.json(userFormat(data))
  })
})

module.exports = router