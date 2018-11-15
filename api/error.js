exports.notFound = function (req, res, next) {
  res.status(404).format({
    json: function () {
      res.send({
        code: 404,
        message: "该页面不存在！"
      })
    }
  }, {
    html: function () {
      res.render('404')
    }
  })
}

exports.internalError = function (req, res, next) {
  res.status(500).format({
    json: function () {
      res.send({
        code: 500,
        message: "内部错误！"
      })
    }
  }, {
    html: function () {
      res.render("500")
    }
  })
}