const {orderController} = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const router = require('express').Router()

router.post("/",verifyToken,orderController.checkout)
router.get("/",orderController.userOrder)
router.get("/status",orderController.getStatus)
router.get("/warehouse/:id",orderController.userWarehouseOrder)

module.exports = router