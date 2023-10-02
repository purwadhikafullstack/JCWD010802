const router = require('express').Router();
const { salesReportController } = require('../controllers');
const { verifyToken } = require('../middlewares/auth');

router.get('/', salesReportController.getSalesReport);
router.get('/month', verifyToken, salesReportController.monthReport);
router.get('/category', verifyToken, salesReportController.categoryMonthReport);
router.get('/product', verifyToken, salesReportController.productMonthReport);





module.exports = router;