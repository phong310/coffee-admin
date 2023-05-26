const newsModel = require("../models/NewsModel");

const NewsController = {

    getAllNews: async (req, res) => {
        try {
            const News = await newsModel.find();
            res.status(200).json(News)

        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // Add news
    createNews: async (req, res) => {
        try {
            const newNews = {
                titleNews: req.body.titleNews,
                imgNews: req.body.imgNews,
                contentNews: req.body.contentNews,
                statusNews: req.body.statusNews
            }

            const News = new newsModel(newNews);
            await News.save();
            res.status(200).json(News)
        } catch (e) {
            console.log(e);
            res.status(500).json({ Err: e })

        }
    }
}

module.exports = NewsController