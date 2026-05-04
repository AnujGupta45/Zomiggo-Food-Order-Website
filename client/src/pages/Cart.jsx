import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, Tag, Info, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-col items-center justify-center py-32 px-4'
      >
        <div className='relative mb-10'>
          <div className='absolute inset-0 bg-primary/20 blur-3xl rounded-full'></div>
          <img src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_ybi7ss' alt='Empty Cart' className='w-72 h-72 relative z-10' />
        </div>
        <h2 className='text-3xl font-black text-gray-800 mb-4 tracking-tight'>Your basket is empty</h2>
        <p className='text-gray-500 mb-10 text-lg max-w-xs text-center leading-relaxed'>Looks like you haven't added anything to your cart yet.</p>
        <Link to='/' className='bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 shadow-2xl shadow-orange-100 transition-all active:scale-95'>
          Explore Restaurants
        </Link>
      </motion.div>
    );
  }

  const deliveryFee = 40;
  const platformFee = 5;
  const gst = Math.round(subtotal * 0.05);
  
  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'FIRST50') {
      setDiscount(50);
      toast.success('Coupon applied! ₹50 OFF', {
        icon: '🎉',
        style: { borderRadius: '16px', background: '#282c3f', color: '#fff' }
      });
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const total = subtotal + deliveryFee + platformFee + gst - discount;

  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <motion.h1 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className='text-4xl font-black mb-12 text-gray-800 tracking-tight'
      >
        Your Order Basket
      </motion.h1>

      <div className='flex flex-col lg:flex-row gap-12 items-start'>
        {/* Cart Items List */}
        <div className='flex-grow space-y-6 w-full'>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                key={item._id} 
                className='bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-8 hover:shadow-xl hover:shadow-gray-100 transition-all group'
              >
                <div className='w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg'>
                  <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' />
                </div>
                <div className='flex-grow text-center sm:text-left'>
                  <h3 className='font-black text-xl text-gray-800 group-hover:text-primary transition-colors'>{item.name}</h3>
                  <p className='text-gray-400 font-bold text-sm mt-1 uppercase tracking-widest'>{item.restaurantName}</p>
                  <p className='text-gray-900 font-black text-lg mt-3'>₹{item.price}</p>
                </div>
                <div className='flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100'>
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                    className='p-3 hover:bg-white hover:shadow-sm rounded-xl text-primary transition-all'
                  >
                    <Minus size={18} />
                  </motion.button>
                  <span className='px-6 font-black text-lg'>{item.quantity}</span>
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                    className='p-3 hover:bg-white hover:shadow-sm rounded-xl text-primary transition-all'
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  onClick={() => removeFromCart(item._id)} 
                  className='p-3 text-gray-300 transition-colors'
                >
                  <Trash2 size={24} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Coupon Section */}
          <div className='bg-orange-50/50 p-8 rounded-[2rem] border-2 border-dashed border-orange-100 mt-12'>
            <div className='flex items-center text-primary font-black mb-6 uppercase tracking-widest text-sm'>
              <Tag size={20} className='mr-2' /> Offers & Benefits
            </div>
            <div className='flex gap-4'>
              <input 
                type='text' 
                placeholder='Enter Promo Code (Try FIRST50)' 
                className='flex-grow px-6 py-4 rounded-2xl bg-white border border-orange-100 outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-bold'
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button 
                onClick={applyCoupon}
                className='bg-primary text-white px-8 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all active:scale-95'
              >
                APPLY
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className='lg:w-[26rem] w-full'>
          <div className='bg-secondary text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-24 overflow-hidden relative'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16'></div>
            
            <h2 className='text-2xl font-black mb-10 pb-6 border-b border-white/10 flex justify-between items-center'>
              Summary 
              <span className='text-sm bg-white/10 px-3 py-1 rounded-full font-bold'>{cartItems.length} items</span>
            </h2>
            
            <div className='space-y-6 text-white/70 mb-10'>
              <div className='flex justify-between items-center'>
                <span className='font-bold uppercase tracking-widest text-xs'>Item Total</span>
                <span className='font-black text-white text-lg'>₹{subtotal}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='flex items-center font-bold uppercase tracking-widest text-xs'>
                  Delivery Fee <Info size={14} className='ml-1 opacity-50' />
                </span>
                <span className='font-black text-white text-lg'>₹{deliveryFee}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='font-bold uppercase tracking-widest text-xs'>Platform Fee</span>
                <span className='font-black text-white text-lg'>₹{platformFee}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='font-bold uppercase tracking-widest text-xs'>GST (5%)</span>
                <span className='font-black text-white text-lg'>₹{gst}</span>
              </div>
              {discount > 0 && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className='flex justify-between items-center text-green-400 font-bold'
                >
                  <span className='uppercase tracking-widest text-xs'>Coupon Discount</span>
                  <span className='text-lg'>-₹{discount}</span>
                </motion.div>
              )}
            </div>
            
            <div className='flex justify-between items-end mb-10 pt-8 border-t border-white/10'>
              <div>
                <p className='text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-1'>To Pay</p>
                <p className='text-4xl font-black tracking-tight'>₹{total}</p>
              </div>
              <div className='text-right flex items-center text-xs text-green-400 font-bold mb-1'>
                <ShieldCheck size={16} className='mr-1' /> Secure 
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checkout')}
              className='w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20'
            >
              Checkout <ArrowRight size={24} className='ml-2' />
            </motion.button>
            
            <p className='mt-6 text-center text-white/30 text-xs font-bold tracking-widest'>
              Safe and Secure Payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
