import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import RestaurantCard from '../components/RestaurantCard';
import Skeleton from '../components/Skeleton';
import { Search, Filter, ArrowRight } from 'lucide-react';

const MOCK_RESTAURANTS = [
  {
    _id: "1",
    name: "Burger King",
    cuisines: ["Burgers", "American"],
    rating: 4.2,
    deliveryTime: "25-30 mins",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "2",
    name: "La Pino'z Pizza",
    cuisines: ["Pizza", "Italian", "Pasta"],
    rating: 4.5,
    deliveryTime: "35-40 mins",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "3",
    name: "Biryani Blues",
    cuisines: ["Biryani", "Hyderabadi", "Indian"],
    rating: 4.1,
    deliveryTime: "40-45 mins",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "4",
    name: "The Coffee Bean",
    cuisines: ["Coffee", "Cafe", "Desserts"],
    rating: 4.7,
    deliveryTime: "15-20 mins",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "5",
    name: "Subway Fresh",
    cuisines: ["Healthy", "Salads", "Sandwich"],
    rating: 4.3,
    deliveryTime: "20-25 mins",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "6",
    name: "KFC Fried Chicken",
    cuisines: ["Fried Chicken", "Fast Food"],
    rating: 4.0,
    deliveryTime: "30-35 mins",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png"
  }
];

const CATEGORIES = [
  { name: "Burger", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=300&auto=format&fit=crop" },
  { name: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop" },
  { name: "Biryani", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=300&auto=format&fit=crop" },
  { name: "Rolls", img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=300&auto=format&fit=crop" },
  { name: "Cake", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop" },
  { name: "Dosa", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=300&auto=format&fit=crop" },
  { name: "Noodles", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=300&auto=format&fit=crop" },
];

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/restaurants');
        if (data && data.length > 0) {
          setRestaurants(data);
        } else {
          setRestaurants(MOCK_RESTAURANTS);
        }
        setLoading(false);
      } catch (error) {
        console.warn('API failed, using mock data');
        setRestaurants(MOCK_RESTAURANTS);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(res => 
    res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.cuisines?.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className='container mx-auto px-4'>
      {/* Hero Section */}
      <section className='mb-16 mt-4'>
        <div className='bg-gradient-to-br from-primary to-orange-600 text-white p-10 md:p-16 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-orange-100 overflow-hidden relative'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl'></div>
          
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='md:w-3/5 z-10'
          >
            <h1 className='text-4xl md:text-6xl font-black mb-6 leading-tight'>
              Premium food, <br/> 
              <span className='text-orange-200 underline decoration-wavy decoration-2'>delivered</span> with love.
            </h1>
            <p className='text-lg md:text-xl mb-10 opacity-90 max-w-lg'>
              Explore the best restaurants in town and get your favorite meals delivered in record time.
            </p>
            
            <div className='flex bg-white rounded-2xl overflow-hidden p-2 shadow-2xl md:w-[110%] group transition-all focus-within:ring-4 focus-within:ring-white/20'>
              <div className='flex items-center px-4 text-gray-400'>
                <Search size={22} />
              </div>
              <input 
                type='text' 
                placeholder='Search for restaurants, cuisines or a specific dish...' 
                className='flex-grow px-2 py-4 text-gray-800 outline-none font-medium'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg flex items-center'
              >
                Find Food <ArrowRight size={20} className='ml-2' />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='hidden md:block md:w-1/3 z-10 relative'
          >
            <div className='animate-float'>
              <img 
                src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop' 
                alt='Hero' 
                className='w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] rounded-full border-8 border-white/20' 
              />
            </div>
            {/* Animated badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className='absolute -top-4 -left-8 bg-white p-3 rounded-2xl shadow-xl flex items-center'
            >
              <div className='bg-green-100 p-2 rounded-lg mr-3 text-green-600 font-bold'>★</div>
              <div className='text-gray-800 text-xs font-bold'>4.8 Rating</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className='mb-16'>
        <h2 className='text-2xl font-black text-gray-800 mb-8 tracking-tight'>What's on your mind?</h2>
        <div className='flex overflow-x-auto pb-4 gap-8 scrollbar-hide no-scrollbar'>
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05 }}
              className='flex-shrink-0 cursor-pointer group text-center'
            >
              <div className='w-32 h-36 mb-2'>
                <img src={cat.img} alt={cat.name} className='w-full h-full object-contain' />
              </div>
              <span className='font-bold text-gray-700 group-hover:text-primary transition-colors'>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Listing */}
      <section className='mb-12'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6'>
          <div>
            <h2 className='text-3xl font-black text-gray-800 mb-2 tracking-tight uppercase'>Restaurants Near You</h2>
            <div className='h-1.5 w-16 bg-primary rounded-full'></div>
          </div>
          
          <div className='flex flex-wrap gap-3'>
            <button className='flex items-center px-5 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-bold shadow-sm hover:border-primary hover:text-primary transition-premium'>
              <Filter size={16} className='mr-2' /> Filters
            </button>
            <button className='px-5 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-bold shadow-sm hover:border-primary hover:text-primary transition-premium'>Rating 4.0+</button>
            <button className='px-5 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-bold shadow-sm hover:border-primary hover:text-primary transition-premium'>Offers</button>
            <button className='px-5 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-bold shadow-sm hover:border-primary hover:text-primary transition-premium'>Fast Delivery</button>
          </div>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} />)}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'
          >
            <AnimatePresence>
              {filteredRestaurants.map(restaurant => (
                <motion.div key={restaurant._id} variants={itemVariants}>
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredRestaurants.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='col-span-full text-center py-20 bg-gray-50 rounded-[2.5rem]'
              >
                <div className='text-6xl mb-4'>🔍</div>
                <p className='text-gray-500 text-xl font-bold'>No restaurants found matching "{searchTerm}"</p>
                <p className='text-gray-400 mt-2'>Try searching for a different cuisine or dish</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Home;
