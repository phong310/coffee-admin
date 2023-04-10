const router = require("express").Router();
const CategoryController = require("../controller/Category");

router.get("/getAll", CategoryController.getAllCate);

module.exports = router