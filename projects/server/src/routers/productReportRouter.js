const router = require('express').Router();
const { productReportController } = require('../controllers');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, productReportController.getStockHistory);
router.get('/product', verifyToken, productReportController.getReportProduct);


module.exports = router;