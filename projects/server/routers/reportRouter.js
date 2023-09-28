const router = require('express').Router();
const { reportController } = require('../controllers');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, reportController.getStockHistory);
router.get('/product', verifyToken, reportController.getReportProduct);


module.exports = router;