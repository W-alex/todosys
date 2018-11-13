const Mongoose = require('mongoose')

/**
 * 通知model
 * to: 被通知者
 * from： 通知者
 * todo: 通知的todo对象
 */
module.exports = new Mongoose.Schema({
  to: {
    ref: "User",
    type: Mongoose.Schema.Types.ObjectId

  },
  from: {
    ref: "User",
    type: Mongoose.Schema.Types.ObjectId
  },
  todo: {
    ref: "Todo",
    type: Mongoose.Schema.Types.ObjectId
  }
})