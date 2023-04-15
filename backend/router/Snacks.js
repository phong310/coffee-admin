const router = require("express").Router();
const SnackController = require("../controller/Snacks");

router.get("/getAllSnack", SnackController.getAllSnack);

router.post("/addNewSnacks", SnackController.createSnacks);

router.delete("/:id", SnackController.deleteSnacks);

router.put("/update/:id", SnackController.updateSnacks);

router.get("/search", SnackController.searchSnacks);

module.exports = router