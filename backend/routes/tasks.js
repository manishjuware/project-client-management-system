//-> Importing packages
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//-> Importing modules/middlewares/models
const Task = require("../models/Task");
const fetchUser = require("../middleware/fetchUser");

//$ ROUTE-1 (CREATE) : Add new task of a user using POST "/api/tasks/addtask". Login required
router.post(
    "/addtask",
    fetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
    ],
    async (req, res) => {
        //* If there are any errors then return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { projectId, title, description, status } = req.body;
            const task = new Task({
                title,
                description,

                status,
                project: projectId,
            });
            const savedTask = await task.save();

            res.send(savedTask);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//$ ROUTE-2 (READ) : Fetch all tasks of a user using POST "/api/tasks/fetchalltasks". Login required
router.post("/fetchalltasks", fetchUser, async (req, res) => {
    try {
        //* find all tasks of a user
        const tasks = await Task.find({ project: req.body.projectId });
        res.json(tasks);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-3 (UPDATE) : Update an existing task of a user using PUT "/api/tasks/updatetask". Login required
router.put("/updatetask/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, status } = req.body;

        //* create a newTask object
        const newTask = {};
        if (title) newTask.title = title;
        if (description) newTask.description = description;

        if (status) newTask.status = status;

        //* find the task tobe updated
        let task = await Task.findById(req.params.id);
        //* if the task is not found
        if (!task) {
            return res.status(404).send("Task not found");
        }

        //* update the task
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true });

        res.send(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-4 (DELETE) : Delete an existing task of a user using DELETE "/api/tasks/deletetask". Login required
router.delete("/deletetask/:id", fetchUser, async (req, res) => {
    try {
        //* find the task to be deleted
        let task = await Task.findById(req.params.id);
        //* if the task is not found
        if (!task) {
            return res.status(404).send("Task not found");
        }

        //* delete the task
        task = await Task.findByIdAndDelete(req.params.id);
        res.json({ Success: "Task has been deleted", task: task });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
