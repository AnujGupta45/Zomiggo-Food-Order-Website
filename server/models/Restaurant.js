const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    deliveryTime: { type: String },
    cuisines: [String],
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String },
        rating: { type: Number },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    menu: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: String },
        category: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
