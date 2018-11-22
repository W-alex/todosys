const Mongoose = require("mongoose")

module.exports = new Mongoose.Schema({
  todoStr: String,
  datetime: {
    type: Date,
    default: new Date()
  },
  finish: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Boolean,
    default: false
  },
  user: {
    ref: "user",
    type: Mongoose.Schema.Types.ObjectId
  },
  project: {
    ref: "Project",
    type: Mongoose.Schema.Types.ObjectId
  }
})