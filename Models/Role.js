const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    userId: String,
    accessScreens: Array
})

module.exports = mongoose.model("Roles", roleSchema);