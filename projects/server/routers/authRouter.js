const { authController } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const { checkRegister, checkLogin } = require("../middlewares/validator")
const router = require("express").Router()

router.post("/register", checkRegister, authController.register)
router.post("/login", checkLogin, authController.login)
router.get("/keeplogin", verifyToken, authController.keepLogin)

module.exports = router