const Restaurant = require('../models/Restaurant');

exports.getAllRestaurants = async (req, res) => {
    try {
        const { search, cuisine, rating } = req.query;
        let query = {};
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (cuisine) {
            query.cuisines = { $in: [cuisine] };
        }
        if (rating) {
            query.rating = { $gte: Number(rating) };
        }

        const restaurants = await Restaurant.find(query);
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        const createdRestaurant = await restaurant.save();
        res.status(201).json(createdRestaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Restaurant removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addReview = async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            const alreadyReviewed = restaurant.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );
            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Product already reviewed' });
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };
            restaurant.reviews.push(review);
            restaurant.numReviews = restaurant.reviews.length;
            restaurant.rating = restaurant.reviews.reduce((acc, item) => item.rating + acc, 0) / restaurant.reviews.length;
            await restaurant.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
