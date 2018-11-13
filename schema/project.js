const Mongoose = require("mongoose")

module.exports = new Mongoose.Schema({
  datetime: {
    type: Date,
    default: new Date()
  },
  name: {
    type: String
  },
  numbers: [{
    ref: "User",
    type: Mongoose.Schema.Types.ObjectId
  }],
  charger: {
    ref: "User",
    type: Mongoose.Schema.Types.ObjectId
  }

})