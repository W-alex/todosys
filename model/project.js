const Mongoose = require("mongoose")
const projectSchema = require("../schema/project")

module.exports = Mongoose.model("Project", projectSchema)