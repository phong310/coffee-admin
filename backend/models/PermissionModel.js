const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    per_name: {
        type: String,
        required: true
    },
    per_name_display: {
        type: String,
        required: true
    },
    per_description: {
        type: String,
        required: true
    },
    per_status: {
        type: String,
        required: true

    }
}, { timestamps: true })

module.exports = mongoose.model("permissionModels", permissionSchema)