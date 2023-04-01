const productModel = require("../models/DrinkModel")


const DrinkController = {

    getAllDrinks: async (req, res) => {
        try {
            const Drinks = await productModel.find();
            res.status(200).json(Drinks)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // Thêm mới
    createDrinks: async (req, res) => {
        try {
            const newDrinks = {
                id: req.body.id,
                img: req.body.img,
                price: req.body.price,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            }

            const Drinks = new productModel(newDrinks)
            await Drinks.save()
            res.status(200).json(Drinks);
            // console.log(Drinks)

        } catch (e) {
            console.log(e)
            res.status(500).json({ ERR: e })
        }
    },

    // Xóa 
    deleteDrinks: async (req, res) => {
        try {
            const drinkId = req.params.id
            const itemDelete = await productModel.findByIdAndRemove(drinkId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },


    // update
    updateDrinks: async (req, res) => {
        try {
            const drinkId = req.params.id;
            const updatedDrink = {
                id: req.body.id,
                img: req.body.img,
                price: req.body.price,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            };
            const query = { _id: drinkId };
            const options = { new: true };
            const result = await productModel.findOneAndUpdate(query, updatedDrink, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // Tìm kiếm
    searchDrinks: async (req, res) => {
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
            const Drinks = await productModel.find(query);
            res.status(200).json(Drinks);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }

}

module.exports = DrinkController