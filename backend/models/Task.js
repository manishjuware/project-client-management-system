const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "todo",
    },
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
