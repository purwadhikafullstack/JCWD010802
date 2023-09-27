const { adminOrderController } = require("../controllers")
const { verifyToken } = require('../middlewares/auth')
const router = require("express").Router()


router.patch("/:id", verifyToken, adminOrderController.confirmPayment)
router.put("/:id", verifyToken, adminOrderController.rejectPayment)
router.put("/cancel/:id", verifyToken, adminOrderController.cancelOrder)

module.exports = router