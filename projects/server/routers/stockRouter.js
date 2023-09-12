const { stockController } = require("../controllers")

const router = require("express").Router()

router.get("/:id",stockController.getStock)

module.exports = router