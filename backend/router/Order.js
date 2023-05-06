const router = require("express").Router();

const OrderController = require("../controller/Order");
const middlewareController = require("../middleware/middlewareController")

router.get("/getAllOrder", middlewareController.verifyAdmin, OrderController.getAllOrder);

router.post("/createOrder", OrderController.createOrder);

router.delete("/:id", OrderController.deleteOrder);

router.put("/update/:id", OrderController.updateOrder);

router.get("/search", OrderController.searchOrder)

module.exports = router;