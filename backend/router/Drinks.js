const router = require("express").Router();
const DrinkController = require("../controller/Drinks");

router.get("/getAll", DrinkController.getAllDrinks);

router.post("/addNewDrinks", DrinkController.createDrinks)

module.exports = router