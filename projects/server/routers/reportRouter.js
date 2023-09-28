const router = require('express').Router();
const { reportController } = require('../controllers')

router.get('/', reportController.getStockHistory);
router.get('/product', reportController.getReportProduct);


module.exports = router;