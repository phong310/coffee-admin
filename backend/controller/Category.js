const CategoryModel = require("../models/CategoryModel")

const CategoryController = {
    // get all user
    getAllCate: async (req, res) => {
        try {
            const user = await CategoryModel.find();
            res.status(200).json(user)
        }
        catch (e) {
            res.status(500).json({ err: e })
        }
    },
}

module.exports = CategoryController