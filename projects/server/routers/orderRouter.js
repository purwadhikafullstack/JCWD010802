const {orderController} = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const router = require('express').Router()

router.get("/",verifyToken,orderController.checkout)

module.exports = router