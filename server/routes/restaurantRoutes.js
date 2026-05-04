const express = require('express');
const { 
    getAllRestaurants, 
    getRestaurantById, 
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant,
    addReview
} = require('../controllers/restaurantController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', protect, admin, createRestaurant);
router.put('/:id', protect, admin, updateRestaurant);
router.delete('/:id', protect, admin, deleteRestaurant);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
