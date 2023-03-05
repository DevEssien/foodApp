const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resturant_name: {
        type: String,
    },
    resturant_location: {
        type: String,
    },
    phoneno: {
        type: Number,
    },
});
