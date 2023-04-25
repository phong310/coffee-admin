const router = require("express").Router();

const RoleController = require("../controller/Roles");

router.get("/getAllRole", RoleController.getAllRole);

router.post("/createOrder", RoleController.createRole);

module.exports = router;