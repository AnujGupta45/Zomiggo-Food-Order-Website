import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, Plus, Minus, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_RESTAURANTS_DATA = {
  "1": {
    name: "Burger King",
    description: "Flame-grilled burgers, crispy fries, and refreshing beverages.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    cuisines: ["Burgers", "American"],
    menu: [
      { _id: "bk1", name: "Whopper Burger", price: 199, description: "Our signature flame-grilled beef patty with juicy tomatoes and fresh lettuce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" },
      { _id: "bk2", name: "Crispy Chicken Royale", price: 159, description: "Breaded chicken breast topped with lettuce and creamy mayonnaise.", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop" },
      { _id: "bk3", name: "King Fries", price: 99, description: "Perfectly salted golden brown potato fries.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop" },
      { _id: "bk4", name: "Chicken Nuggets (6pc)", price: 149, description: "Bite-sized pieces of tender chicken, breaded and fried.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop" },
      { _id: "bk5", name: "Chocolate Shake", price: 129, description: "Creamy vanilla soft serve blended with chocolate syrup.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop" },
      { _id: "bk6", name: "Veggie Whopper", price: 179, description: "Flame-grilled plant-based patty with fresh veggies.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "2": {
    name: "La Pino'z Pizza",
    description: "Authentic Italian pizzas with premium toppings and gooey cheese.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    deliveryTime: "35-40 mins",
    cuisines: ["Pizza", "Italian", "Pasta"],
    menu: [
      { _id: "lp1", name: "Farmhouse Special", price: 399, description: "Loaded with onion, capsicum, tomato and grilled mushroom.", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600&auto=format&fit=crop" },
      { _id: "lp2", name: "7 Cheese Pizza", price: 499, description: "A heavenly blend of 7 different types of premium cheese.", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600&auto=format&fit=crop" },
      { _id: "lp3", name: "White Sauce Pasta", price: 249, description: "Creamy pasta with herbs, corn and bell peppers.", image: "https://images.unsplash.com/photo-1645112481338-30145014ec3b?q=80&w=600&auto=format&fit=crop" },
      { _id: "lp4", name: "Garlic Bread Sticks", price: 129, description: "Freshly baked bread sticks seasoned with garlic and herbs.", image: "https://images.unsplash.com/photo-1619531043553-908611181f7d?q=80&w=600&auto=format&fit=crop" },
      { _id: "lp5", name: "Spicy Paneer Pizza", price: 429, description: "Spicy paneer cubes with capsicum and red paprika.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop" },
      { _id: "lp6", name: "Choco Lava Cake", price: 99, description: "Hot chocolate cake with a molten chocolate center.", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "3": {
    name: "Biryani Blues",
    description: "Rich and aromatic Hyderabadi biryanis cooked to perfection.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop",
    rating: 4.1,
    deliveryTime: "40-45 mins",
    cuisines: ["Biryani", "Indian", "Mughlai"],
    menu: [
      { _id: "bb1", name: "Chicken Dum Biryani", price: 349, description: "Authentic Hyderabadi chicken biryani with long grain basmati rice.", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop" },
      { _id: "bb2", name: "Paneer Biryani", price: 299, description: "Fragrant biryani with marinated paneer cubes and spices.", image: "https://images.unsplash.com/photo-1633383718081-22ac93e3dbf1?q=80&w=600&auto=format&fit=crop" },
      { _id: "bb3", name: "Double Ka Meetha", price: 129, description: "Traditional bread pudding dessert with saffron and nuts.", image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=600&auto=format&fit=crop" },
      { _id: "bb4", name: "Mutton Biryani", price: 449, description: "Succulent mutton pieces slow-cooked with aromatic rice.", image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=600&auto=format&fit=crop" },
      { _id: "bb5", name: "Chicken 65", price: 249, description: "Spicy, deep-fried chicken starter with curry leaves.", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=600&auto=format&fit=crop" },
      { _id: "bb6", name: "Burani Raita", price: 49, description: "Creamy yogurt with roasted garlic and spices.", image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "4": {
    name: "The Coffee Bean",
    description: "Gourmet coffee blends and artisanal desserts.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    deliveryTime: "15-20 mins",
    cuisines: ["Coffee", "Cafe", "Desserts"],
    menu: [
      { _id: "cb1", name: "Caramel Macchiato", price: 229, description: "Freshly steamed milk with vanilla-flavored syrup marked with espresso.", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop" },
      { _id: "cb2", name: "Blueberry Cheesecake", price: 189, description: "Creamy cheesecake topped with delicious blueberry compote.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop" },
      { _id: "cb3", name: "Club Sandwich", price: 159, description: "Three-layered sandwich with veggies, cheese and herbs.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop" },
      { _id: "cb4", name: "Iced Americano", price: 169, description: "Espresso shots topped with cold water and ice.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop" },
      { _id: "cb5", name: "Chocolate Brownie", price: 119, description: "Warm, fudgy chocolate brownie with walnuts.", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=600&auto=format&fit=crop" },
      { _id: "cb6", name: "Hazelnut Latte", price: 199, description: "Smooth espresso with steamed milk and hazelnut flavor.", image: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "5": {
    name: "Subway Fresh",
    description: "Freshly made sandwiches, wraps, and salads.",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    deliveryTime: "20-25 mins",
    cuisines: ["Healthy", "Salads", "Sandwich"],
    menu: [
      { _id: "sw1", name: "Paneer Tikka Sub", price: 189, description: "Spiced paneer tikka with your choice of veggies and sauces.", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=600&auto=format&fit=crop" },
      { _id: "sw2", name: "Roasted Chicken Sub", price: 219, description: "Tender roasted chicken with fresh toppings in freshly baked bread.", image: "https://images.unsplash.com/photo-1509722747041-619f382b83ca?q=80&w=600&auto=format&fit=crop" },
      { _id: "sw3", name: "Garden Salad", price: 149, description: "A healthy mix of seasonal vegetables with light vinaigrette.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop" },
      { _id: "sw4", name: "Cookies (Pack of 3)", price: 99, description: "Freshly baked oatmeal and chocolate chip cookies.", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop" },
      { _id: "sw5", name: "Tuna Sub", price: 249, description: "Creamy tuna mix with crunchy vegetables.", image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?q=80&w=600&auto=format&fit=crop" },
      { _id: "sw6", name: "Veggie Delite", price: 159, description: "Refreshing combination of garden fresh vegetables.", image: "https://images.unsplash.com/photo-1540713434306-591d413d7bb1?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "6": {
    name: "KFC Fried Chicken",
    description: "World famous crispy fried chicken and bucket meals.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png",
    rating: 4.0,
    deliveryTime: "30-35 mins",
    cuisines: ["Fried Chicken", "Fast Food"],
    menu: [
      { _id: "kfc1", name: "Zinger Burger", price: 179, description: "Signature crispy chicken fillet burger with spicy mayo.", image: "https://images.unsplash.com/photo-1513639732840-c6d710bd60ad?q=80&w=600&auto=format&fit=crop" },
      { _id: "kfc2", name: "Chicken Bucket (4pc)", price: 449, description: "Our world-famous Hot & Crispy chicken pieces.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop" },
      { _id: "kfc3", name: "Popcorn Chicken", price: 129, description: "Bite-sized pieces of breaded chicken fried to perfection.", image: "https://images.unsplash.com/photo-1562967914-c36f13904943?q=80&w=600&auto=format&fit=crop" },
      { _id: "kfc4", name: "Chicken Strips (3pc)", price: 159, description: "Boneless chicken strips, seasoned and fried.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop" },
      { _id: "kfc5", name: "Rice Bowl", price: 199, description: "Spiced rice with gravy and crispy chicken pieces.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop" },
      { _id: "kfc6", name: "Krusher Shake", price: 149, description: "Cold and creamy blended beverage with crunchy toppings.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop" }
    ]
  }
};

const RestaurantDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        if (data) {
          setRestaurant(data);
        } else {
          setRestaurant(MOCK_RESTAURANTS_DATA[id] || MOCK_RESTAURANTS_DATA["1"]);
        }
        setLoading(false);
      } catch (error) {
        console.warn('API failed, using realistic mock data for restaurant');
        setRestaurant(MOCK_RESTAURANTS_DATA[id] || MOCK_RESTAURANTS_DATA["1"]);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((i) => i._id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, restaurantId: id, restaurantName: restaurant.name });
    toast.success(`${item.name} added!`, {
      icon: '🔥',
      style: {
        borderRadius: '20px',
        background: '#282c3f',
        color: '#fff',
        fontWeight: 'bold'
      },
    });
  };

  if (loading) return <div className='p-12'><Skeleton /><Skeleton /></div>;
  if (!restaurant) return <div className='p-12 text-center'>Restaurant not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='max-w-5xl mx-auto px-4 py-8'
    >
      {/* Breadcrumbs & Back */}
      <Link to="/" className='flex items-center text-gray-500 hover:text-primary mb-8 font-bold transition-colors group'>
        <ArrowLeft size={20} className='mr-2 group-hover:-translate-x-1 transition-transform' />
        Back to Restaurants
      </Link>

      {/* Header Info */}
      <div className='bg-white p-8 rounded-[3rem] shadow-xl shadow-orange-50 border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-12 relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16'></div>
        
        <div className='md:w-2/3 z-10'>
          <div className='flex items-center space-x-3 mb-4'>
            <span className='bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider'>Top Rated</span>
            <span className='text-gray-300'>•</span>
            <span className='text-gray-500 text-sm font-bold'>{restaurant.cuisines?.join(', ')}</span>
          </div>
          <h1 className='text-4xl md:text-5xl font-black text-gray-800 mb-6 tracking-tight'>{restaurant.name}</h1>
          
          <div className='flex items-center space-x-8'>
            <div className='flex flex-col'>
              <span className='flex items-center font-black text-xl text-green-600'>
                <Star size={20} className='mr-1.5 fill-green-600' />
                {restaurant.rating}
              </span>
              <span className='text-xs text-gray-400 font-bold uppercase tracking-widest mt-1'>Ratings</span>
            </div>
            <div className='h-10 w-px bg-gray-100'></div>
            <div className='flex flex-col'>
              <span className='font-black text-xl text-gray-700 flex items-center'>
                <Clock size={20} className='mr-1.5' />
                {restaurant.deliveryTime}
              </span>
              <span className='text-xs text-gray-400 font-bold uppercase tracking-widest mt-1'>Delivery</span>
            </div>
            <div className='h-10 w-px bg-gray-100'></div>
            <button className='flex flex-col items-center group'>
              <Heart size={24} className='text-gray-300 group-hover:text-red-500 transition-colors' />
              <span className='text-[10px] text-gray-400 font-bold uppercase mt-1'>Favorite</span>
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className='w-full md:w-80 h-56 mt-8 md:mt-0 rounded-3xl overflow-hidden shadow-2xl relative group'
        >
          <img src={restaurant.image} alt={restaurant.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6'>
            <span className='text-white font-bold text-sm'>View Gallery</span>
          </div>
        </motion.div>
      </div>

      {/* Menu Section */}
      <div className='space-y-16'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-black text-gray-800 tracking-tight uppercase'>Full Menu</h2>
          <div className='text-primary font-bold flex items-center cursor-pointer hover:underline'>
            Filters <Plus size={18} className='ml-1' />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 pb-24'>
          {restaurant.menu?.map((item, index) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              key={item._id} 
              className='bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-2xl hover:shadow-orange-50 transition-all duration-500 group'
            >
              <div className='flex-grow pr-8'>
                <div className='flex items-center mb-2'>
                  <div className='w-4 h-4 border-2 border-green-600 p-0.5 flex items-center justify-center mr-2'>
                    <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                  </div>
                  <span className='text-xs font-black text-primary uppercase tracking-widest'>Must Try</span>
                </div>
                <h3 className='text-2xl font-black text-gray-800 mb-2 group-hover:text-primary transition-colors'>{item.name}</h3>
                <p className='text-2xl font-bold text-gray-900 mb-4'>₹{item.price}</p>
                <p className='text-gray-400 text-sm leading-relaxed max-w-xl'>{item.description}</p>
              </div>

              <div className='relative mt-8 md:mt-0 flex-shrink-0'>
                <div className='w-44 h-40 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white'>
                  <img src={item.image || 'https://via.placeholder.com/300x200?text=Food'} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' />
                </div>
                <div className='absolute -bottom-4 left-1/2 -translate-x-1/2'>
                  <AnimatePresence mode='wait'>
                    {getItemQuantity(item._id) > 0 ? (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className='bg-white shadow-2xl border border-gray-100 flex items-center rounded-2xl overflow-hidden'
                      >
                        <button 
                          onClick={() => updateQuantity(item._id, getItemQuantity(item._id) - 1)}
                          className='p-3 hover:bg-gray-50 text-primary transition-colors'
                        >
                          <Minus size={18} />
                        </button>
                        <span className='px-4 font-black text-primary text-lg'>{getItemQuantity(item._id)}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, getItemQuantity(item._id) + 1)}
                          className='p-3 hover:bg-gray-50 text-primary transition-colors'
                        >
                          <Plus size={18} />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(item)}
                        className='bg-white shadow-2xl border border-gray-100 text-primary font-black px-10 py-3 rounded-2xl hover:bg-primary hover:text-white transition-all uppercase text-sm tracking-widest'
                      >
                        Add
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart for Mobile */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className='fixed bottom-8 left-4 right-4 md:left-auto md:right-8 z-50'
          >
            <Link to="/cart">
              <div className='bg-secondary text-white p-6 rounded-[2.5rem] shadow-2xl flex justify-between items-center md:w-80 border-4 border-white/10'>
                <div className='flex items-center'>
                  <div className='bg-primary p-2 rounded-xl mr-4'>
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className='text-xs font-bold opacity-80 uppercase tracking-widest'>Review Order</p>
                    <p className='text-xl font-black'>{cartItems.length} Items</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-2xl font-black tracking-tight'>₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RestaurantDetails;
