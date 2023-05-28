const router = require("express").Router();
const NewsController = require("../controller/News");

router.get("/getAllNews", NewsController.getAllNews)

router.post("/addNews", NewsController.createNews)

router.delete("/:id", NewsController.deleteNews)

router.put("/update/:id", NewsController.updateNewInfo)

router.get("/search", NewsController.searchInfor)

module.exports = router