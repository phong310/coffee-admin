const router = require("express").Router();

const PermissionController = require("../controller/Permission");
const middlewareController = require("../middleware/middlewareController")


router.get("/getAllPermission", middlewareController.verifyAdmin, PermissionController.getAllPermission);

router.post("/createPermission", PermissionController.createPermission);

router.delete("/:id", PermissionController.deletePermission);

router.put("/update/:id", PermissionController.updatePermission);

router.get("/search", PermissionController.searchPermission)

module.exports = router;