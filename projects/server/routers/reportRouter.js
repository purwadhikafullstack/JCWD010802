const { reportController } = require('../controllers');
const { verifyToken } = require('../middlewares/auth');

const router = require('express').Router();

router.get("/", verifyToken, reportController.productChart)

module.exports = router