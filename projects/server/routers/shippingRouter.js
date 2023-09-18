const router = require('express').Router();
const { shippingController } = require('../controllers');

router.post('/', shippingController.findNearestWarehouse);

module.exports = router;