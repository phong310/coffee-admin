const router = require("express").Router();
const NewsController = require("../controller/News");

router.get("/getAllNews", NewsController.getAllNews)

router.post("/addNews", NewsController.createNews)

module.exports = router