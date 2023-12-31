const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to MongoDB");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectToMongo;
