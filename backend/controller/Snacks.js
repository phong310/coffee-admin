const mongoose = require("mongoose");

const SnackModel = mongoose.model('snacksmodels', {});

const SnackController = {

    getAllSnack: async (req, res) => {
        try {
            const Snack = await SnackModel.find();
            res.status(200).json(Snack)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    }
}

module.exports = SnackController