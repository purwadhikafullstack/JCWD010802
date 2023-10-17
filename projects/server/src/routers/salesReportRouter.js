const router = require('express').Router();
const { salesReportController } = require('../controllers');
const { verifyToken } = require('../middlewares/auth');

router.get('/', salesReportController.getSalesReport);
router.get('/chart', verifyToken, salesReportController.chartReport);
router.get('/table-sales', verifyToken, salesReportController.tableSalesReport);






module.exports = router;