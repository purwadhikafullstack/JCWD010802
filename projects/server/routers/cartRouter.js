const {cartController} = require('../controllers')
const { verifyToken } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/',verifyToken, cartController.getUserCart)
router.get('/wishlist',verifyToken, cartController.getWishlist)
router.post('/wishlist/:productId',verifyToken, cartController.addToWishlist)
router.get('/is-in-wishlist/:productId',verifyToken, cartController.isWishlist)
router.delete('/wishlist/:productId',verifyToken, cartController.removeWishlistItem)
router.post('/:id',verifyToken, cartController.addToCart)
router.delete('/:id',verifyToken, cartController.removeFromCart)
router.patch('/:id', cartController.editCartItemQuantity)

module.exports = router