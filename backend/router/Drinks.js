const router = require("express").Router();
const DrinkController = require("../controller/Drinks");

router.get("/getAll", DrinkController.getAllDrinks);

router.post("/addNewDrinks", DrinkController.createDrinks)

router.delete("/:id", DrinkController.deleteDrinks)

router.put("/update/:id", DrinkController.updateDrinks)

module.exports = router