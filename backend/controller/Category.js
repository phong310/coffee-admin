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
            res.status(500).json({ err: e })
        }
    },

    updateCateLog: async (req, res) => {
        try {
            const cateId = req.params.id;
            const newCateUpdate = {
                catename: req.body.catename,
                title: req.body.title,
                description: req.body.description
            }
            const query = { _id: cateId };
            const options = { new: true };
            const result = await CategoryModel.findOneAndUpdate(query, newCateUpdate, options);
            res.status(200).json(result);

        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    deleteCateLog: async (req, res) => {
        try {
            const cateId = req.params.id
            const itemDelete = await CategoryModel.findByIdAndRemove(cateId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // Tìm kiếm
    searchCateLog: async (req, res) => {
        try {
            const cateName = req.query.catename;
            let query = {};
            if (cateName) {
                query = { catename: new RegExp(cateName, "i") };
            }
            const Cate = await CategoryModel.find(query);
            res.status(200).json(Cate);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }
}

module.exports = CategoryController