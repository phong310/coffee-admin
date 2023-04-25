const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        required: true
    },
    role_description: {
        type: String,
        required: true
    },
    role_status: {
        type: String,
        required: true

    }
}, { timestamps: true })

module.exports = mongoose.model("rolemodels", roleSchema)