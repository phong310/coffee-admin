const router = require("express").Router();
const BakeryController = require("../controller/Bakerys")
const middlewareController = require("../middleware/middlewareController")

router.get("/getAllBakery", middlewareController.verifyProduct, BakeryController.getAllBakery);

router.post("/addNewBakery", BakeryController.createBakery);

router.delete("/:id", BakeryController.deleteBakery);

router.put("/update/:id", BakeryController.updateBakery);

router.get("/search", BakeryController.searchBakery)

module.exports = router