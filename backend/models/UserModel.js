const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirm: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        required: true,
    }

}, { timestamps: true })

module.exports = mongoose.model("usermodels", userSchema)