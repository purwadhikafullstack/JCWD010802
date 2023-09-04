const {warehouseControllers} = require('../controllers')
const router = require('express').Router()

router.get("/",warehouseControllers.getWarehouse)

module.exports = router