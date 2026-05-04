import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MapPin, CreditCard, ChevronRight, Loader2, CheckCircle, Smartphone, Globe, Banknote } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentStep, setPaymentStep] = useState(1); // 1: Address, 2: Payment Method, 3: Processing
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const navigate = useNavigate();

  const total = subtotal + 40 + 5 + Math.round(subtotal * 0.05);

  const handleNextStep = () => {
    if (paymentStep === 1) {
      if (!address) return toast.error('Please enter delivery address');
      setPaymentStep(2);
    } else if (paymentStep === 2) {
      setPaymentStep(3);
      simulatePayment();
    }
  };

  const simulatePayment = () => {
    setLoading(true);
    // Mock Razorpay/Payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success('Payment Received!', {
        duration: 4000,
        style: { borderRadius: '20px', background: '#282c3f', color: '#fff' }
      });
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 4000);
    }, 3000);
  };

  const paymentMethods = [
    { id: 'upi', name: 'Google Pay / PhonePe', icon: <Smartphone size={24} />, color: 'bg-purple-100 text-purple-600' },
    { id: 'card', name: 'Credit / Debit Cards', icon: <CreditCard size={24} />, color: 'bg-blue-100 text-blue-600' },
    { id: 'netbanking', name: 'Net Banking', icon: <Globe size={24} />, color: 'bg-green-100 text-green-600' },
    { id: 'cod', name: 'Cash on Delivery', icon: <Banknote size={24} />, color: 'bg-orange-100 text-orange-600' },
  ];

  if (success) {
    return (
      <div className='flex flex-col items-center justify-center py-32 px-4'>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          className='w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-200'
        >
          <CheckCircle size={64} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-5xl font-black text-gray-800 mb-4'
        >
          Order Placed!
        </motion.h1>
        <p className='text-gray-500 text-xl font-medium text-center max-w-md mb-12'>
          Your food is being prepared. Check your email for order confirmation.
        </p>
        <div className='w-full max-w-md bg-gray-50 p-6 rounded-3xl border border-gray-100'>
          <div className='flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-4'>
            <span>Order ID</span>
            <span className='text-gray-800'>#ORD-{Math.floor(Math.random()*1000000)}</span>
          </div>
          <div className='space-y-3'>
            <div className='flex justify-between font-bold'>
              <span>Estimated Delivery</span>
              <span className='text-primary'>35 Mins</span>
            </div>
            <div className='flex justify-between font-bold'>
              <span>Status</span>
              <span className='text-green-600'>Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <div className='flex items-center space-x-4 mb-12'>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${paymentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
        <div className={`h-1 w-12 rounded-full ${paymentStep >= 2 ? 'bg-primary' : 'bg-gray-100'}`}></div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${paymentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
        <div className={`h-1 w-12 rounded-full ${paymentStep >= 3 ? 'bg-primary' : 'bg-gray-100'}`}></div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${paymentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>3</div>
        <h1 className='text-3xl font-black text-gray-800 ml-4 tracking-tight'>
          {paymentStep === 1 ? 'Delivery Details' : paymentStep === 2 ? 'Payment Method' : 'Processing Order'}
        </h1>
      </div>

      <div className='flex flex-col lg:flex-row gap-12'>
        <div className='flex-grow'>
          <AnimatePresence mode='wait'>
            {paymentStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className='bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100'
              >
                <div className='flex items-center space-x-3 mb-8'>
                  <div className='bg-orange-100 text-primary p-3 rounded-2xl'>
                    <MapPin size={24} />
                  </div>
                  <h2 className='text-2xl font-black text-gray-800'>Where should we deliver?</h2>
                </div>
                <textarea 
                  className='w-full p-6 border-2 border-gray-50 bg-gray-50 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none min-h-[180px] font-bold text-lg transition-all'
                  placeholder='Enter your complete address with landmark...'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <div className='mt-8 flex gap-4'>
                  <div className='p-4 border-2 border-primary bg-orange-50 rounded-2xl flex-grow flex items-center justify-between cursor-pointer'>
                    <span className='font-bold text-gray-700'>Home</span>
                    <div className='w-4 h-4 bg-primary rounded-full'></div>
                  </div>
                  <div className='p-4 border-2 border-gray-100 hover:border-primary/30 rounded-2xl flex-grow flex items-center justify-between cursor-pointer'>
                    <span className='font-bold text-gray-400'>Work</span>
                  </div>
                </div>
              </motion.div>
            )}

            {paymentStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className='bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100'
              >
                <div className='flex items-center space-x-3 mb-8'>
                  <div className='bg-blue-100 text-blue-600 p-3 rounded-2xl'>
                    <CreditCard size={24} />
                  </div>
                  <h2 className='text-2xl font-black text-gray-800'>How would you like to pay?</h2>
                </div>
                
                <div className='space-y-4'>
                  {paymentMethods.map(method => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-6 rounded-[1.5rem] border-2 transition-all cursor-pointer flex items-center justify-between ${selectedMethod === method.id ? 'border-primary bg-orange-50 shadow-lg shadow-orange-100' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}
                    >
                      <div className='flex items-center'>
                        <div className={`p-3 rounded-xl mr-4 ${method.color}`}>
                          {method.icon}
                        </div>
                        <span className={`font-black text-lg ${selectedMethod === method.id ? 'text-gray-800' : 'text-gray-500'}`}>{method.name}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-primary' : 'border-gray-300'}`}>
                        {selectedMethod === method.id && <div className='w-3 h-3 bg-primary rounded-full'></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {paymentStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='bg-white p-20 rounded-[2.5rem] shadow-xl text-center'
              >
                <Loader2 size={80} className='animate-spin text-primary mx-auto mb-8' />
                <h2 className='text-3xl font-black text-gray-800 mb-4'>Processing Payment</h2>
                <p className='text-gray-500 font-bold'>Please do not refresh the page or press back.</p>
                <div className='mt-12 max-w-xs mx-auto'>
                  <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                      className='h-full bg-primary'
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Order Info */}
        <div className='lg:w-96 w-full'>
          <div className='bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 sticky top-24'>
            <h2 className='text-xl font-black mb-8 border-b pb-4'>Order Summary</h2>
            <div className='space-y-6 mb-8 max-h-60 overflow-y-auto pr-2'>
              {cartItems.map(item => (
                <div key={item._id} className='flex justify-between text-sm group'>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                    <span className='font-bold text-gray-600 group-hover:text-gray-800 transition-colors'>{item.name} x {item.quantity}</span>
                  </div>
                  <span className='font-black text-gray-800'>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className='space-y-4 pt-6 border-t'>
              <div className='flex justify-between text-sm font-bold text-gray-400'>
                <span>Bill Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className='flex justify-between text-sm font-bold text-gray-400'>
                <span>Delivery & Taxes</span>
                <span>₹{45 + Math.round(subtotal * 0.05)}</span>
              </div>
              <div className='flex justify-between text-2xl font-black text-gray-800 pt-4'>
                <span>To Pay</span>
                <span>₹{total}</span>
              </div>
            </div>
            
            {paymentStep < 3 && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextStep}
                disabled={loading}
                className='w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center hover:bg-orange-600 shadow-2xl shadow-orange-100 mt-10'
              >
                {paymentStep === 1 ? 'Next: Payment' : 'Pay Securely'} <ChevronRight size={24} className='ml-1' />
              </motion.button>
            )}
            
            <p className='mt-6 text-center text-gray-300 text-[10px] font-black uppercase tracking-[0.2em]'>
              100% SECURE CHECKOUT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
