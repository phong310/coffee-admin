const router = require("express").Router();

const RoleController = require("../controller/Roles");
const middlewareController = require("../middleware/middlewareController")


router.get("/getAllRole", middlewareController.verifyAdmin, RoleController.getAllRole);

router.post("/createOrder", RoleController.createRole);

router.delete("/:id", RoleController.deleteRole);

router.put("/update/:id", RoleController.updateUser)

router.get("/search", RoleController.searchRole)

module.exports = router;