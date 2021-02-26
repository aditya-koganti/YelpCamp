var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    todo: String,
    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model("Todo", todoSchema);