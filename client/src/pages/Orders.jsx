import React from 'react';
import { ShoppingBag, ChevronRight, CheckCircle, Clock, MapPin, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

const Orders = () => {
  const mockOrders = [
    {
      id: "ORD-928374",
      restaurant: "Burger King",
      date: "24 May, 2026",
      amount: 450,
      status: "Delivered",
      items: ["Whopper Burger x 2", "Large Fries x 1"],
      image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/e33e1d3ba7d6b2bb577d333f0aa41e05"
    },
    {
      id: "ORD-123456",
      restaurant: "Pizza Hut",
      date: "20 May, 2026",
      amount: 899,
      status: "Delivered",
      items: ["Margherita Pizza x 1", "Garlic Bread x 2"],
      image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/2b4f52d60d4a2126bb85730b52c6a231"
    }
  ];

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className='flex items-center space-x-4 mb-12'
      >
        <div className='bg-primary/10 text-primary p-3 rounded-2xl'>
          <ShoppingBag size={28} />
        </div>
        <h1 className='text-4xl font-black text-gray-800 tracking-tight'>Order History</h1>
      </motion.div>

      <div className='space-y-8'>
        {mockOrders.map((order, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={order.id}
            className='bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-orange-50 transition-all duration-500'
          >
            <div className='p-8 flex flex-col md:flex-row gap-8 items-start'>
              <div className='w-full md:w-32 h-32 flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-gray-50'>
                <img src={order.image} alt={order.restaurant} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' />
              </div>
              
              <div className='flex-grow'>
                <div className='flex justify-between items-start mb-2'>
                  <h2 className='text-2xl font-black text-gray-800 group-hover:text-primary transition-colors'>{order.restaurant}</h2>
                  <span className='bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center shadow-sm'>
                    <CheckCircle size={14} className='mr-1.5' /> {order.status}
                  </span>
                </div>
                <div className='flex items-center text-gray-400 text-sm font-bold mb-4 space-x-4'>
                  <span className='flex items-center'><Clock size={14} className='mr-1' /> {order.date}</span>
                  <span className='text-gray-200'>|</span>
                  <span>ID: {order.id}</span>
                </div>
                <p className='text-gray-500 text-sm font-medium mb-6 line-clamp-1'>
                  {order.items.join(', ')}
                </p>
                <div className='flex justify-between items-center pt-6 border-t border-gray-50'>
                  <div className='flex flex-col'>
                    <span className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Total Paid</span>
                    <span className='text-2xl font-black text-gray-800 tracking-tight'>₹{order.amount}</span>
                  </div>
                  <div className='flex space-x-3'>
                    <button className='px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center'>
                      Details <ChevronRight size={16} className='ml-1' />
                    </button>
                    <button className='px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all flex items-center active:scale-95'>
                      <Repeat size={16} className='mr-2' /> Reorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <div className='text-center py-20'>
          <ShoppingBag size={64} className='mx-auto text-gray-200 mb-6' />
          <h2 className='text-2xl font-bold text-gray-400'>No orders yet</h2>
        </div>
      )}
    </div>
  );
};

export default Orders;
