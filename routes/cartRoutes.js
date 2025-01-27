const router = require('express').Router();
const cartController = require('../controllers/cartController')


router.get('/get_cart/:userId', cartController.getCartProductById);

router.post('/addToCart', cartController.addToCart)

// DELETE /api/cart/deleteFromCart/:userId/:productId
router.delete('/deleteFromCart/:user/:productId', cartController.deleteProductFromCart);

module.exports = router;