const router = require('express').Router();
const { rajaOngkirController } = require('../controllers');
const {verifyToken} = require('../middlewares/auth')

router.get('/city', rajaOngkirController.getCity);
router.get('/province', rajaOngkirController.getProvince);

module.exports = router;