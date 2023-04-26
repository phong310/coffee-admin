const router = require("express").Router();

const PermissionController = require("../controller/Permission");

router.get("/getAllPermission", PermissionController.getAllPermission);

router.post("/createPermission", PermissionController.createPermission);

router.delete("/:id", PermissionController.deletePermission);

router.put("/update/:id", PermissionController.updatePermission)

module.exports = router;