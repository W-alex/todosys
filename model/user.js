const Mongoose = require("mongoose")
const userSchema = require('../schema/user')

module.exports = Mongoose.model("User", userSchema)