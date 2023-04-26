const router = require("express").Router();

const PermissionController = require("../controller/Permission");

router.get("/getAllPermission", PermissionController.getAllPermission);

router.post("/createPermission", PermissionController.createPermission);

module.exports = router;