//-> Importing packages
const express = require("express");
require("dotenv").config();

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

//-> Importing models
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

//-> JWT_SECRET string
const jwtSecret = process.env.JWT_SECRET;

//$ ROUTE-1 : Create a new User using POST "/auth/signup". No login required
router.post(
    "/signup",
    [
        // body('parameterToBeChecked', 'Error Message').validationCheckFunction()
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
    ],

    async (req, res) => {
        //* Setting a success variable
        let success = false;

        //* If there are any errors then return them with the error message and the error code
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array() });
        }

        try {
            //* check if any user with the same email already exists
            let user = await User.findOne({ email: req.body.email });
            //* findOne returns a promise

            //* if user already exists
            if (user) {
                return res.status(400).json({
                    success,
                    error: "Sorry! A user with this email already exists.",
                });
            }

            //* Creating a hash of the password
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(req.body.password, salt);

            //* create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });

            //* creating a JWT authentication token
            const data = { user: { id: user.id } };
            const authToken = jwt.sign(data, jwtSecret);

            // sending JWT token to client
            success = true;
            res.json({ success, authToken });
        } catch (error) {
            success = false;
            res.status(500).json({ success, error: "Internal Server Error" });
        }
    }
);

//$ ROUTE-2 : Login a user using POST "/auth/login". No login required
router.post(
    "/login",
    [
        //* validating the request data
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Password cannot be blank").isLength({ min: 1 }),
    ],
    async (req, res) => {
        //* Setting a success variable
        let success = false;

        //* checking validation results for errors
        const errors = validationResult(req);

        //* If there are any errors then return them with the error message and the error code
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        //* Destructuring the request payload
        const { email, password } = req.body;

        try {
            //* check if user exists in database
            let user = await User.findOne({ email });
            if (!user) {
                //* if user doesn't exist return bad request
                return res.status(400).json({ success, error: "Please enter a correct email" });
            }

            //* If user exists
            //* compare password with stored hashed password on the DB
            const comparePassword = await bcrypt.compare(password, user.password);
            //* bcrypt.compare() returns true if the password matches the stored hashed password else returns false
            if (!comparePassword) {
                //* if password doesn't match return bad request
                return res.status(400).json({ success, error: "Please enter a correct password" });
            }

            //* if password was correct the generate Authentication token and send to user
            success = true;
            //* creating a JWT authentication token
            const data = { user: { id: user.id } };
            const authToken = jwt.sign(data, jwtSecret);

            //* sending JWT token to client
            res.json({ success, authToken: authToken });
        } catch (error) {
            success = false;
            console.log(error.message);
            res.status(500).send(success, "Internal Server Error");
        }
    }
);

//$ ROUTE-3 : Get user data using POST "/auth/getuser".Login required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
