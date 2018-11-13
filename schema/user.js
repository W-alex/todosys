const Mongoose = require("mongoose")

module.exports = new Mongoose.Schema({
  username: String,
  userid: String,
  password: String
})