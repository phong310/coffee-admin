const router = require("express").Router();
const DrinkController = require("../controller/Drinks");

router.get("/getAll", DrinkController.getAllDrinks);

router.post("/addNewDrinks", DrinkController.createDrinks)

router.delete("/:id", DrinkController.deleteDrinks)

module.exports = router