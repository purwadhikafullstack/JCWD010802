const {cartController} = require('../controllers')
const { verifyToken } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/',verifyToken, cartController.getUserCart)
router.post('/:id',verifyToken, cartController.addToCart)
router.delete('/:id',verifyToken, cartController.removeFromCart)
router.patch('/:id', cartController.editCartItemQuantity)

module.exports = router