const mongoose = require("mongoose");

const ToDo = mongoose.model("ToDo", {
  title: { type: String },
  desc: { type: String },
  whenToDo: { type: Date },
  done: { type: Boolean },
});

module.exports = { ToDo };
