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

    // Add infor sp
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
    },

    // Delete infor sp
    deleteNews: async (req, res) => {
        try {
            const NewsId = req.params.id
            const itemDelete = await newsModel.findByIdAndRemove(NewsId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // update infor sp
    updateNewInfo: async (req, res) => {
        try {
            const NewsId = req.params.id;
            const updatedNewInfor = {
                titleNews: req.body.titleNews,
                imgNews: req.body.imgNews,
                contentNews: req.body.contentNews,
                statusNews: req.body.statusNews
            };
            const query = { _id: NewsId };
            const options = { new: true };
            const result = await newsModel.findOneAndUpdate(query, updatedNewInfor, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // search info sp
    searchInfor: async (req, res) => {
        try {
            const title = req.query.titleNews;
            const status = req.query.statusNews;
            let query = {};
            if (title && status) {
                query = { titleNews: new RegExp(title, "i"), statusNews: status };
            } else if (title) {
                query = { titleNews: new RegExp(title, "i") };
            } else if (status) {
                query = { statusNews: status };
            }
            const Infor = await newsModel.find(query);
            res.status(200).json(Infor);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }

}

module.exports = NewsController