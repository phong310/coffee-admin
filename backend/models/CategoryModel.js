const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    catename: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
}, { timestamps: true })

module.exports = mongoose.model("categorymodel", CategorySchema)