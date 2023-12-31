const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
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
    deadline: {
        type: String,
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model("project", ProjectsSchema);

module.exports = Project;
