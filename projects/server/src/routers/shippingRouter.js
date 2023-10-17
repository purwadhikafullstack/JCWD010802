const router = require('express').Router();
const { shippingController } = require('../controllers');

router.get('/', shippingController.findNearestWarehouse);

module.exports = router;