import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Shield, Bell, ChevronRight, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { name: 'Guest User', email: 'guest@example.com' };
  
  const [activeTab, setActiveTab] = useState('account');

  const menuItems = [
    { id: 'account', name: 'Account Info', icon: <User size={20} /> },
    { id: 'addresses', name: 'Saved Addresses', icon: <MapPin size={20} /> },
    { id: 'security', name: 'Security', icon: <Shield size={20} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={20} /> },
  ];

  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-col md:flex-row gap-12'
      >
        {/* Sidebar */}
        <div className='w-full md:w-80 space-y-4'>
          <div className='bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 text-center mb-8'>
            <div className='w-24 h-24 bg-primary text-white text-4xl font-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200'>
              {user.name[0].toUpperCase()}
            </div>
            <h2 className='text-2xl font-black text-gray-800 tracking-tight'>{user.name}</h2>
            <p className='text-gray-400 font-bold text-sm'>{user.email}</p>
          </div>

          <div className='bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 space-y-2'>
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-orange-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <div className='flex items-center'>
                  <span className='mr-3'>{item.icon}</span>
                  {item.name}
                </div>
                <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-30'} />
              </button>
            ))}
            <button className='w-full flex items-center px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all mt-4'>
              <LogOut size={20} className='mr-3' /> Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className='flex-grow bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100 border border-gray-100'>
          {activeTab === 'account' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
              <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-black text-gray-800 tracking-tight'>Account Settings</h2>
                <button className='bg-gray-100 p-3 rounded-xl text-gray-600 hover:bg-primary hover:text-white transition-all'>
                  <Edit2 size={20} />
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='space-y-2'>
                  <label className='text-xs font-black text-gray-400 uppercase tracking-widest'>Full Name</label>
                  <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                    <User size={18} className='text-gray-400 mr-3' />
                    <span className='font-bold text-gray-700'>{user.name}</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-xs font-black text-gray-400 uppercase tracking-widest'>Email Address</label>
                  <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                    <Mail size={18} className='text-gray-400 mr-3' />
                    <span className='font-bold text-gray-700'>{user.email}</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-xs font-black text-gray-400 uppercase tracking-widest'>Phone Number</label>
                  <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                    <Phone size={18} className='text-gray-400 mr-3' />
                    <span className='font-bold text-gray-700'>+91 98765 43210</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-xs font-black text-gray-400 uppercase tracking-widest'>Location</label>
                  <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                    <MapPin size={18} className='text-gray-400 mr-3' />
                    <span className='font-bold text-gray-700'>LPU, Punjab, India</span>
                  </div>
                </div>
              </div>

              <div className='bg-orange-50 p-8 rounded-[2rem] border border-orange-100 mt-12 flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-black text-orange-800'>Super Member</h3>
                  <p className='text-orange-600 font-medium text-sm'>Get free delivery on all orders above ₹199</p>
                </div>
                <button className='bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all'>
                  Renew Now
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'addresses' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
              <h2 className='text-3xl font-black text-gray-800 tracking-tight'>Saved Addresses</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='p-6 border-2 border-primary bg-orange-50 rounded-[2rem] relative group cursor-pointer'>
                  <div className='bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-100'>
                    <MapPin size={20} />
                  </div>
                  <h3 className='font-black text-lg text-gray-800 mb-1'>Home</h3>
                  <p className='text-gray-500 text-sm font-medium leading-relaxed'>
                    Block 32, Room 405, Lovely Professional University, Phagwara, Punjab - 144411
                  </p>
                </div>
                <button className='p-6 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all group'>
                  <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-all'>
                    <Plus size={24} />
                  </div>
                  <span className='font-bold'>Add New Address</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
