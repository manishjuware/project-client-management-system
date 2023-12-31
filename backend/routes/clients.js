//-> Importing packages
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//-> Importing modules/middlewares/models
const Client = require("../models/Client");
const Project = require("../models/Project");
const fetchUser = require("../middleware/fetchUser");

//$ ROUTE-1 (CREATE) : Add new client of a user using POST "/clients/addclient". Login required
router.post(
    "/addclient",
    fetchUser,
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("phone", "Enter a valid Phone Number").isLength({ min: 10, max: 10 }),
    ],
    async (req, res) => {
        //* If there are any errors then return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, phone } = req.body;
            const client = new Client({
                name,
                email,
                phone,
                user: req.user.id,
            });
            const savedClient = await client.save();
            res.send(savedClient);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//$ ROUTE-2 (READ) : Fetch all clients of a user using GET "/clients/fetchallclients". Login required
router.get("/fetchallclients", fetchUser, async (req, res) => {
    try {
        //* find all clients of a user
        const clients = await Client.find({ user: req.user.id });
        res.json(clients);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-3 (UPDATE) : Update an existing client of a user using PUT "/clients/updateclient". Login required
router.put("/updateclient/:id", fetchUser, async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        //* create a newClient object
        const newClient = {};
        if (name) newClient.name = name;
        if (email) newClient.email = email;
        if (phone) newClient.phone = phone;

        //* find the client tobe updated
        let client = await Client.findById(req.params.id);
        //* if the client is not found
        if (!client) {
            return res.status(404).send("Client not found");
        }

        //* Allow updation only if the  user owns the client
        if (client.user.toString() !== req.user.id) {
            return res.status(403).send("Action not allowed");
        }

        //* update the client
        client = await Client.findByIdAndUpdate(req.params.id, { $set: newClient }, { new: true });

        res.send(client);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-4 (DELETE) : Delete an existing client of a user using DELETE "/clients/deleteclient". Login required
router.delete("/deleteclient/:id", fetchUser, async (req, res) => {
    try {
        //* find the client to be deleted
        let client = await Client.findById(req.params.id);
        //* if the client is not found
        if (!client) {
            return res.status(404).send("Client not found");
        }

        //* Allow deletion only if the  user owns the client
        if (client.user.toString() !== req.user.id) {
            return res.status(403).send("Action not allowed");
        }

        //* delete all projects releated to client
        await Project.deleteMany({ client: req.params.id });

        //* delete the client
        client = await Client.findByIdAndDelete(req.params.id);
        res.json({ Success: "Client has been deleted", client: client });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//$ ROUTE-5 (READ) : Fetch a client of a user using GET "/clients/fetchclient". Login required
router.get("/fetchclient/:id", fetchUser, async (req, res) => {
    try {
        //* find the client
        let client = await Client.findById(req.params.id);
        //* if the client is not found
        if (!client) {
            return res.status(404).send("Client not found");
        }
        //* send only if the user owns the client
        if (client.user.toString() !== req.user.id) {
            return res.status(403).send("Action not allowed");
        }

        res.json(client);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
