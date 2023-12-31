const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});
const Client = mongoose.model("client", ClientSchema);

module.exports = Client;
