const router = require("express").Router();

const RoleController = require("../controller/Roles");

router.get("/getAllRole", RoleController.getAllRole);

router.post("/createOrder", RoleController.createRole);

router.delete("/:id", RoleController.deleteRole);

router.put("/update/:id", RoleController.updateUser)

router.get("/search", RoleController.searchRole)

module.exports = router;