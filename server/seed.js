const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const restaurants = [
    {
        name: "Burger King",
        description: "Burgers, Fast Food, Beverages",
        image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/e33e1d3ba7d6b2bb577d333f0aa41e05",
        rating: 4.2,
        deliveryTime: "25-30 mins",
        cuisines: ["Burgers", "American"],
        menu: [
            { name: "Whopper Burger", price: 199, description: "Classic flame-grilled beef burger", category: "Burgers" },
            { name: "Chicken Royale", price: 149, description: "Crispy chicken breast with lettuce", category: "Burgers" },
            { name: "French Fries", price: 99, description: "Salted golden fries", category: "Sides" }
        ]
    },
    {
        name: "Pizza Hut",
        description: "Pizzas, Pasta, Italian",
        image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/2b4f52d60d4a2126bb85730b52c6a231",
        rating: 4.5,
        deliveryTime: "35-40 mins",
        cuisines: ["Pizza", "Italian"],
        menu: [
            { name: "Margherita Pizza", price: 299, description: "Classic cheese and tomato pizza", category: "Pizza" },
            { name: "Pepperoni Pizza", price: 449, description: "Loaded with spicy pepperoni", category: "Pizza" },
            { name: "Garlic Bread", price: 129, description: "Baked with garlic butter", category: "Sides" }
        ]
    },
    {
        name: "Biryani Blues",
        description: "Biryani, Hyderabadi, Indian",
        image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/mthsc0xpxxvyqpxv9k6t",
        rating: 4.1,
        deliveryTime: "40-45 mins",
        cuisines: ["Biryani", "North Indian"],
        menu: [
            { name: "Chicken Biryani", price: 349, description: "Fragrant basmati rice with spiced chicken", category: "Biryani" },
            { name: "Paneer Biryani", price: 299, description: "Vegetarian version of the classic", category: "Biryani" }
        ]
    }
];

const seedDB = async () => {
    try {
        await Restaurant.deleteMany({});
        await Restaurant.insertMany(restaurants);
        console.log("Data Seeded Successfully");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedDB();
