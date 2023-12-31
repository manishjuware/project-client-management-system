const connectToMongo = require("./database");
const express = require("express");
const cors = require("cors");
require("dotenv").config;
connectToMongo();

const app = express();
const port = process.env.PORT;

//* express.json() is a built-in middleware function in Express
//* used to parse the incoming requests with JSON payloads
app.use(express.json());
app.use(cors());
//* Available Routes
app.use("/auth", require("./routes/auth"));
app.use("/projects", require("./routes/projects"));
app.use("/tasks", require("./routes/tasks"));
app.use("/clients", require("./routes/clients"));

app.listen(port, () => {
    console.log(`PMS backend listening on port ${port}`);
});
