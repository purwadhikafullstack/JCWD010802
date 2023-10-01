    const { stockController } = require("../controllers")
    const { verifyToken } = require("../middlewares/auth")

    const router = require("express").Router()

    router.get("/", verifyToken, stockController.warehouseStock)
    router.get("/product/:id", stockController.getProductStock)
    router.get("/journal/:id", stockController.getWarehouseJournal)

    module.exports = router