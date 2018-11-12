const Mongoose = require("mongoose")
const todoSchema = require("../schema/todo")

module.exports = Mongoose.model("Todo", todoSchema)