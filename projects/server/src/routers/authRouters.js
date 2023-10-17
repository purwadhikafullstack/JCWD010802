const {authControllers} = require('../controllers')
const { verifyToken } = require('../middlewares/auth')
const router = require('express').Router()


router.post('/forgot', authControllers.forgotPassword)
router.patch('/reset',verifyToken, authControllers.resetPassword)

module.exports = router