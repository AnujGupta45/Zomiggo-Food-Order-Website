const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [{
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        restaurantId: String,
        restaurantName: String,
        _id: String // Using the menu item ID
    }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
