import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, Plus, Minus, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_RESTAURANT = {
  _id: "1",
  name: "La Pino'z Pizza",
  description: "Pizza, Italian, Pasta, Beverages",
  image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
  rating: 4.5,
  deliveryTime: "35-40 mins",
  cuisines: ["Pizza", "Italian", "Pasta"],
  menu: [
    { _id: "m1", name: "Farmhouse Pizza", price: 399, description: "Delightful combination of onion, capsicum, tomato & grilled mushroom", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600&auto=format&fit=crop" },
    { _id: "m2", name: "Paneer Tikka Pizza", price: 449, description: "Spiced paneer, onion and capsicum with tandoori sauce", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600&auto=format&fit=crop" },
    { _id: "m3", name: "Garlic Breadsticks", price: 129, description: "Freshly baked breadsticks with garlic and herbs", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop" },
    { _id: "m4", name: "Choco Lava Cake", price: 99, description: "Hot chocolate cake with a molten center", image: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?q=80&w=600&auto=format&fit=crop" }
  ]
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
          setRestaurant(MOCK_RESTAURANT);
        }
        setLoading(false);
      } catch (error) {
        console.warn('API failed, using mock data for restaurant');
        setRestaurant(MOCK_RESTAURANT);
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
          <h2 className='text-3xl font-black text-gray-800 tracking-tight uppercase'>Recommended Dishes</h2>
          <div className='text-primary font-bold flex items-center cursor-pointer hover:underline'>
            Full Menu <Plus size={18} className='ml-1' />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8'>
          {restaurant.menu?.map((item, index) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={item._id} 
              className='bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-2xl hover:shadow-orange-50 transition-all duration-500 group'
            >
              <div className='flex-grow pr-8'>
                <div className='flex items-center mb-2'>
                  <div className='w-4 h-4 border-2 border-green-600 p-0.5 flex items-center justify-center mr-2'>
                    <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                  </div>
                  <span className='text-xs font-black text-primary uppercase tracking-widest'>Best Seller</span>
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
