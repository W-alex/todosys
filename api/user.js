const User = require('../model/user')

let responseData

User.prototype.toJSON = function () {
  return {
    username: this.username,
    userid: this.userid,
    id: this._id
  }
}

exports.add = function (user) {
  const addUser = new User(user)
  addUser.save().exec((err, data) => {
    if (err) {
      next(err)
    }
    return
  })
}

exports.getAll = function (req, res, next) {
  User.find().then(users => {
    res.json(users)
  })
}

exports.getOther = function (req, res, next) {
  const id = req.query.id;
  User.find().ne('_id', id).exec((err, data) => {
    if (err) {
      next(err)
    }
    res.json(data)
  })
}