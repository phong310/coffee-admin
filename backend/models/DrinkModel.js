const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    img: String,
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("productmodels", drinkSchema)