const router = require("express").Router()
const { orderController } = require("../controllers")
const { verifyToken } = require('../middlewares/auth')
const { multerUpload } = require("../middlewares/multer")

router.get("/admin",orderController.userOrder)
router.get("/status",orderController.getStatus)
router.get("/", verifyToken, orderController.allOrder)
router.post("/",verifyToken,orderController.checkout)
router.patch("/payment/:id", verifyToken, multerUpload('/paymentImg', 'paymentImg').single('file'), orderController.uploadPayment)
router.put("/cancel/:id", verifyToken, orderController.cancelOrder)
router.patch("/confirm/:id", verifyToken, orderController.confirmOrder)
router.get("/warehouse/:id",orderController.userWarehouseOrder)
router.get("/:id", orderController.orderById)

module.exports = router