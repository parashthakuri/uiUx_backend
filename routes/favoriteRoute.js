
const router = require('express').Router();
const favoriteController = require('../controllers/favoriteController');

//todo: GET /api/favorites/get_favorites/:userId
router.get('/get_favorites/:userId', favoriteController.getFavoritesByUserId);

//todo: POST /api/favorites/add_to_favorites
router.post('/add_to_favorites', favoriteController.addToFavorites);

//todo: DELETE /api/favorites/remove_from_favorites/:userId/:productId
router.delete('/remove_from_favorites/:userId/:productId', favoriteController.removeFromFavorites);

module.exports = router;


