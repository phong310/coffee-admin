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

    createCatelog: async (req, res) => {
        try {
            const newCate = {
                catename: req.body.catename,
                title: req.body.title,
                description: req.body.description
            };
            const cate = new CategoryModel(newCate);
            await cate.save();
            res.status(200).json(cate)

        } catch (e) {
            s.status(500).json({ err: e })
        }
    }
}

module.exports = CategoryController