const {orderController} = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const router = require('express').Router()
const { multerUpload } = require("../middlewares/multer")

router.get("/", verifyToken, orderController.allOrder)
router.post("/",verifyToken,orderController.checkout)
router.patch("/payment/:id", verifyToken, multerUpload('./public/paymentImg', 'paymentImg').single('file'), orderController.uploadPayment)
router.put("/cancel/:id", verifyToken, orderController.cancelOrder)
router.patch("/confirm/:id", verifyToken, orderController.confirmOrder)


module.exports = router