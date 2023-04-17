const router = require("express").Router();

const OrderController = require("../controller/Order");

router.get("/getAllOrder", OrderController.getAllOrder);

router.post("/createOrder", OrderController.createOrder);

module.exports = router;