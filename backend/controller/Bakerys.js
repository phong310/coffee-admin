const BakeryModel = require("../models/BakeryModel")

const BakeryController = {

    getAllBakery: async (req, res) => {
        try {
            const Bakery = await BakeryModel.find();
            res.status(200).json(Bakery)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // Thêm mới
    createBakery: async (req, res) => {
        try {
            const newBakery = {
                id: req.body.id,
                img: req.body.img,
                price: req.body.price,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            }

            const Bakerys = new BakeryModel(newBakery)
            await Bakerys.save()
            res.status(200).json(Bakerys);
            // console.log(Drinks)

        } catch (e) {
            console.log(e)
            res.status(500).json({ ERR: e })
        }
    },

    // Xóa 
    deleteBakery: async (req, res) => {
        try {
            const bakeryId = req.params.id
            const itemDelete = await BakeryModel.findByIdAndRemove(bakeryId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },


    // update
    updateBakery: async (req, res) => {
        try {
            const bakeryId = req.params.id;
            const updatedBakery = {
                id: req.body.id,
                img: req.body.img,
                price: req.body.price,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            };
            const query = { _id: bakeryId };
            const options = { new: true };
            const result = await BakeryModel.findOneAndUpdate(query, updatedBakery, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // Tìm kiếm
    searchBakery: async (req, res) => {
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
            const bakerys = await BakeryModel.find(query);
            res.status(200).json(bakerys);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }
}

module.exports = BakeryController