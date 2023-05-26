const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    titleNews: {
        type: String,
        required: true
    },
    imgNews: String,
    contentNews: {
        type: String,
        required: false
    },
    statusNews: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("newsmodels", newsSchema)