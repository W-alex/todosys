const Mongoose = require('mongoose')
const noticeSchema = require('../schema/notice')


module.exports = Mongoose.model("Notice", noticeSchema)