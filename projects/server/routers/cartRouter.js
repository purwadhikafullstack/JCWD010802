const {cartController} = require('../controllers')
const { verifyToken } = require('../middlewares/auth')
const router = require('express').Router()


router.post('/:id',verifyToken, cartController.addToCart)
router.get('/',verifyToken, cartController.getUserCart)

module.exports = router