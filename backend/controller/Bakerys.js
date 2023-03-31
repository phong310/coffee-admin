const BakerySchema = require("../models/BakeryModel")

const BakeryController = {

    createBakery: async (req, res) => {
        try {
            const newBakery = {
                id: 19,
                img: "https://phuclong.com.vn/uploads/dish/01b9696b860549-banhphap_0000s_0001_buttercroissant.jpg",
                price: 19056,
                title: "Butter Croissant",
            }
            const Bakery = new BakerySchema(newBakery);
            await Bakery.save();
            res.status(200).json(Bakery)

        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    getAllBakery: async (req, res) => {
        try {
            const Bakery = await BakerySchema.find();
            res.status(200).json(Bakery)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    }
}

module.exports = BakeryController