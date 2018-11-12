var express = require('express');
var router = express.Router();
const User = require('../model/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.end("hello test!");
});

let responseData;

router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next();
})

router.post("/register", function (req, res, next) {
  const username = req.body.username;
  const userid = req.body.userid;
  const password = req.body.password;

  if (password !== req.body.repassword) {
    responseData.code = 500
    responseData.message = "两次输入密码不一致！请重新输入"
    res.json(responseData)
    return
  }

  User.findOne({
    userid: userid
  }).then(data => {
    if (data) {
      responseData.code = 500
      responseData.message = "该用户名已经被注册！"
      res.json(responseData)
      return
    }
    const user = new User({
      userid: userid,
      username: username,
      password: password
    })
    return user.save()
  }).then(data => {
    console.log("register success!" + data);
    responseData.code = 200
    responseData.message = "注册成功！"
    res.json(responseData)
  }).catch(err => {
    console.log(err)
    responseData = 500;
    responseData.message = "失败！！！"
    res.json(responseData)
  })
})

router.post("/login", function (req, res, next) {
  const userid = req.body.userid;
  const pwd = req.body.pwd;

  User.findOne({
    userid: userid
  }).then(function (data) {
    if (data) {
      if (data.password === pwd) {
        responseData.code = 200
        responseData.message = data

      } else {
        responseData.code = 500;
        responseData.message = "密码错误！"
      }
    } else {
      responseData.code = 404;
      responseData.message = "用户不存在！"
    }
    res.json(responseData)
  })
})


module.exports = router;