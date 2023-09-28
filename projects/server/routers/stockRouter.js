    const { stockController } = require("../controllers")
    const { verifyToken } = require("../middlewares/auth")

    const router = require("express").Router()

    router.post("/", verifyToken, stockController.addStock)
    router.patch("/", verifyToken, stockController.updateStock)
    router.get("/", stockController.getStockByWarehouse)
    router.get("/product/:id", stockController.getProductStock)
    router.get("/journal/:id", stockController.getWarehouseJournal)

    module.exports = router