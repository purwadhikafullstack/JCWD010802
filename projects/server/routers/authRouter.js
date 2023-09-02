const { authController } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const router = require("express").Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/keeplogin", verifyToken, authController.keepLogin)

module.exports = router