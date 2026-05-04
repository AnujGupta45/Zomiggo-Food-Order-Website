import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut, ShoppingBag, Settings, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowUserDropdown(false);
    navigate('/login');
    window.location.reload();
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='glass py-4 px-6 sticky top-0 z-50 border-b border-gray-100'
    >
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center space-x-2 group'>
          <motion.div 
            whileHover={{ rotate: 15 }}
            className='bg-primary p-1.5 rounded-lg shadow-lg shadow-orange-200'
          >
            <ShoppingCart className='text-white' size={24} />
          </motion.div>
          <span className='text-primary text-2xl font-black tracking-tight group-hover:text-orange-600 transition-colors'>Zomiggo</span>
        </Link>

        <div className='hidden md:flex items-center space-x-10'>
          <Link to='/' className='flex items-center text-gray-700 hover:text-primary font-bold transition-premium group'>
            <Search size={20} className='mr-2 group-hover:scale-110 transition-transform' />
            <span>Search</span>
          </Link>

          {user ? (
            <div className='relative'>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className='flex items-center text-gray-700 group cursor-pointer bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 hover:bg-white hover:shadow-lg hover:shadow-gray-100 transition-all'
              >
                <div className='w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-black mr-2 shadow-md shadow-orange-200'>
                  {user.name[0].toUpperCase()}
                </div>
                <span className='font-black text-sm tracking-tight'>{user.name}</span>
                <ChevronDown size={16} className={`ml-2 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
              </motion.div>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className='absolute right-0 mt-3 w-64 bg-white rounded-[1.5rem] shadow-2xl border border-gray-50 overflow-hidden z-50 p-2'
                  >
                    <Link 
                      to='/profile' 
                      onClick={() => setShowUserDropdown(false)}
                      className='flex items-center px-4 py-4 hover:bg-orange-50 rounded-xl text-gray-600 hover:text-primary font-bold transition-all group'
                    >
                      <User size={18} className='mr-3 text-gray-400 group-hover:text-primary' />
                      My Profile
                    </Link>
                    <Link 
                      to='/orders' 
                      onClick={() => setShowUserDropdown(false)}
                      className='flex items-center px-4 py-4 hover:bg-orange-50 rounded-xl text-gray-600 hover:text-primary font-bold transition-all group'
                    >
                      <ShoppingBag size={18} className='mr-3 text-gray-400 group-hover:text-primary' />
                      Orders
                    </Link>
                    <div className='h-px bg-gray-50 my-2 mx-4'></div>
                    <button 
                      onClick={handleLogout}
                      className='w-full flex items-center px-4 py-4 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-500 font-bold transition-all group'
                    >
                      <LogOut size={18} className='mr-3 text-gray-300 group-hover:text-red-500' />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to='/login' className='flex items-center text-gray-700 hover:text-primary font-black transition-premium'>
              <User size={20} className='mr-2' />
              <span>Sign In</span>
            </Link>
          )}

          <Link to='/cart' className='relative'>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center bg-secondary text-white px-6 py-3 rounded-2xl transition-all shadow-xl shadow-secondary/20 hover:shadow-secondary/40'
            >
              <ShoppingCart size={20} className='mr-2' />
              <span className='font-black tracking-tight'>Cart</span>
              {cartItems.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black rounded-full h-6 w-6 flex items-center justify-center border-4 border-white'
                >
                  {cartItems.length}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
