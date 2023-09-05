const { authController } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const { checkRegister, checkLogin } = require("../middlewares/validator")
const { checkVerified } = require('../middlewares/authValidator')
const router = require("express").Router()

router.post("/register", checkRegister, authController.register)
router.post("/login", checkLogin, authController.login)
router.get("/keeplogin", verifyToken, authController.keepLogin)
router.put("/resend", authController.resendVerif)
router.patch('/verified', verifyToken, checkVerified, authController.verified)

module.exports = router
