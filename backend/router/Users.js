const router = require("express").Router();

const UserController = require("../controller/Users");

router.get("/getAllUser", UserController.getAllUser);

router.post("/createUser", UserController.createUser);

router.delete("/:id", UserController.deleteUser)

module.exports = router;