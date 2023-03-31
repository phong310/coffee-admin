const router = require("express").Router();
const SnackController = require("../controller/Snacks");

router.get("/getAllSnack", SnackController.getAllSnack);

module.exports = router