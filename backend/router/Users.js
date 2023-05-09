const router = require("express").Router();

const UserController = require("../controller/Users");
const middlewareController = require("../middleware/middlewareController")



router.get("/getAllUser", middlewareController.verifyAdmin, UserController.getAllUser);

router.post("/createUser", UserController.createUser);

router.delete("/:id", UserController.deleteUser);

router.put("/update/:id", UserController.updateUser)

router.post("/reset/:id", UserController.resetPassword)

router.get("/search", UserController.searchUser)



module.exports = router;