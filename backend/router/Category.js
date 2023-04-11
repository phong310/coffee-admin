const router = require("express").Router();
const CategoryController = require("../controller/Category");

router.get("/getAllCate", CategoryController.getAllCate);

router.post("/createCate", CategoryController.createCatelog)

module.exports = router