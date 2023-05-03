const router = require("express").Router();

const OrderController = require("../controller/Order");

router.get("/getAllOrder", OrderController.getAllOrder);

router.post("/createOrder", OrderController.createOrder);

router.delete("/:id", OrderController.deleteOrder);

router.put("/update/:id", OrderController.updateOrder);

router.get("/search", OrderController.searchOrder)

module.exports = router;