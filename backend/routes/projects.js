//-> Importing packages
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//-> Importing modules/middlewares/models
const Project = require("../models/Project");
const Task = require("../models/Task");
const fetchUser = require("../middleware/fetchUser");

//$ ROUTE-1 (CREATE) : Add new project of a user using POST "/projects/addproject". Login required
router.post(
    "/addproject",
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
            const { title, description, status, deadline, client } = req.body;
            const project = new Project({
                title,
                description,
                status,
                deadline,
                client,
                user: req.user.id,
            });
            const savedProject = await project.save();

            res.send(savedProject);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//$ ROUTE-2 (READ) : Fetch all projects of a user using GET "/projects/fetchallprojects". Login required
router.get("/fetchallprojects", fetchUser, async (req, res) => {
    try {
        //* find all projects of a user
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-3 (UPDATE) : Update an existing project of a user using PUT "/projects/updateproject". Login required
router.put("/updateproject/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, status, deadline, client } = req.body;

        //* create a newProject object
        const newProject = {};
        if (title) newProject.title = title;
        if (description) newProject.description = description;
        if (status) newProject.status = status;
        if (deadline) newProject.deadline = deadline;
        if (client) newProject.client = client;

        //* find the project tobe updated
        let project = await Project.findById(req.params.id);
        //* if the project is not found
        if (!project) {
            return res.status(404).send("Project not found");
        }

        //* Allow updation only if the  user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(403).send("Action not allowed");
        }

        //* update the project
        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: newProject },
            { new: true }
        );

        res.send(project);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-4 (DELETE) : Delete an existing project of a user using DELETE "/projects/deleteproject". Login required
router.delete("/deleteproject/:id", fetchUser, async (req, res) => {
    try {
        //* find the project to be deleted
        let project = await Project.findById(req.params.id);
        //* if the project is not found
        if (!project) {
            return res.status(404).send("Project not found");
        }

        //* Allow deletion only if the  user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(403).send("Action not allowed");
        }

        //* delete all tasks releated to project
        await Task.deleteMany({ project: req.params.id });

        //* delete the project
        project = await Project.findByIdAndDelete(req.params.id);
        res.json({ Success: "Project has been deleted", project: project });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-5 (READ) : Fetch a project of a user using POST "/projects/fetchproject". Login required
router.post("/fetchproject", fetchUser, async (req, res) => {
    try {
        //* find the project to be deleted
        let project = await Project.findById(req.body.id);
        //* if the project is not found
        if (!project) {
            return res.status(404).send("Project not found");
        }
        //* send only if the  user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(403).send("Action not allowed");
        }
        res.json(project);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
