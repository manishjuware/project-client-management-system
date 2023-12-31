require("dotenv").config();
const jwt = require("jsonwebtoken");

//-> JWT_SECRET string
const jwtSecret = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    //* Get JWT token from request header and add user to the request object
    const token = req.header("auth-token");

    if (!token) {
        res.status(401).send("Please authenticate using valid token");
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate using valid token");
    }
};

module.exports = fetchUser;
