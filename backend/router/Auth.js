const router = require("express").Router();

const AuthController = require("../controller/authControllers");
const middlewareController = require("../middleware/middlewareController")


// LOGIN
router.post("/login", AuthController.loginUser)

// REQUEST REFRESH TOKEN
router.post("/refresh", AuthController.requestRefeshToken)

// LOGOUT
router.post("/logout", middlewareController.verifyToken, AuthController.logOutUser)

module.exports = router;