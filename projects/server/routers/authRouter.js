const router = require('express').Router();
const { authController } = require('../controllers');
const {verifyToken} = require('../middlewares/auth')
const { checkRegister, checkVerified } = require('../middlewares/authValidator')

router.post('/register', checkRegister, authController.register);
router.patch('/verified', verifyToken, checkVerified, authController.verified)

module.exports = router;