import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className='block group'>
      <motion.div 
        whileHover={{ y: -8 }}
        className='bg-white rounded-3xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-orange-100 border border-gray-50'
      >
        <div className='relative h-56 w-full overflow-hidden'>
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={restaurant.image || 'https://via.placeholder.com/400x300?text=Restaurant'} 
            alt={restaurant.name} 
            className='h-full w-full object-cover'
          />
          <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black flex items-center shadow-lg border border-white/50'>
            <Star size={14} className='text-green-600 mr-1 fill-green-600' />
            <span className='text-gray-800'>{restaurant.rating}</span>
          </div>
          
          <div className='absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold'>
            {restaurant.deliveryTime}
          </div>
        </div>
        <div className='p-6'>
          <h3 className='font-black text-xl text-gray-800 mb-2 truncate group-hover:text-primary transition-colors'>{restaurant.name}</h3>
          <div className='flex items-center text-gray-500 text-sm font-medium'>
            <span className='truncate'>{restaurant.cuisines?.join(', ')}</span>
          </div>
          <div className='mt-4 pt-4 border-t border-gray-50 flex justify-between items-center'>
            <span className='text-xs font-bold text-gray-400 uppercase tracking-widest'>View Menu</span>
            <div className='w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-premium'>
              →
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RestaurantCard;
