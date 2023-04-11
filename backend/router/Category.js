const router = require("express").Router();
const CategoryController = require("../controller/Category");

router.get("/getAllCate", CategoryController.getAllCate);

router.post("/createCate", CategoryController.createCatelog);

router.put("/updateCate/:id", CategoryController.updateCateLog)

router.delete("/:id", CategoryController.deleteCateLog);

router.get("/search", CategoryController.searchCateLog)

module.exports = router