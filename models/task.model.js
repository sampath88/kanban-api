const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide an ID"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [200, "Title should not exceed 200 characters"],
  },
  stats: {
    type: String,
    required: [true, "Please provide stats"],
  },
  assignedTo: {
    type: String,
    required: [true, "Please mention assignedTo"],
  },
  progress: {
    type: Number,
    required: [true, "Please provide progress"],
  },
  status: {
    type: String,
    required: [true, "Please add current status"],
  },
  order: {
    type: Number,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("Task", taskSchema);
