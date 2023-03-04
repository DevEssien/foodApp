const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    home_address: {
        type: String,
    },
    phoneno: {
        type: Number,
    },
});

module.exports = mongoose.model("Customer", customerSchema);
