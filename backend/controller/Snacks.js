const SnackModel = require("../models/SnackModel")

const SnackController = {

    getAllSnack: async (req, res) => {
        try {
            const Snack = await SnackModel.find();
            res.status(200).json(Snack)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    },
    // Thêm mới
    createSnacks: async (req, res) => {
        try {
            const newSnacks = {
                id: req.body.id,
                img: req.body.img,
                price: req.body.price,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            }

            const Snacks = new SnackModel(newSnacks)
            await Snacks.save()
            res.status(200).json(Snacks);
        } catch (e) {
            console.log(e)
            res.status(500).json({ ERR: e })
        }
    },

    // Xóa 
    deleteSnacks: async (req, res) => {
        try {
            const snackId = req.params.id
            const itemDelete = await SnackModel.findByIdAndRemove(snackId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },


    // update
    updateSnacks: async (req, res) => {
        try {
            const snackId = req.params.id;
            const updateSnacks = {
                id: req.body.id,
                img: req.body.img,
                price: req.body.price,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            };
            const query = { _id: snackId };
            const options = { new: true };
            const result = await SnackModel.findOneAndUpdate(query, updateSnacks, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // Tìm kiếm
    searchSnacks: async (req, res) => {
        try {
            const title = req.query.title;
            const status = req.query.status;
            let query = {};
            if (title && status) {
                query = { title: new RegExp(title, "i"), status: status };
            } else if (title) {
                query = { title: new RegExp(title, "i") };
            } else if (status) {
                query = { status: status };
            }
            const Snacks = await SnackModel.find(query);
            res.status(200).json(Snacks);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }
}

module.exports = SnackController