import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock signup
    setTimeout(() => {
      localStorage.setItem('token', 'mock_token');
      localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email, role: 'user' }));
      toast.success('Account created successfully!');
      navigate('/');
      window.location.reload();
    }, 1500);
  };

  return (
    <div className='flex items-center justify-center py-12 px-4'>
      <div className='bg-white p-8 rounded-3xl shadow-xl w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Join Zomiggo</h1>
          <p className='text-gray-500'>Create an account to start ordering</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type='text' 
                required
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                placeholder='John Doe'
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type='email' 
                required
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                placeholder='you@example.com'
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <div className='relative'>
              <Phone className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type='tel' 
                required
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                placeholder='9876543210'
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type='password' 
                required
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                placeholder='••••••••'
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type='submit'
            disabled={loading}
            className='w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors mt-4 flex items-center justify-center'
          >
            {loading ? <Loader2 className='animate-spin' size={24} /> : 'Create Account'}
          </button>
        </form>

        <div className='mt-8 text-center'>
          <p className='text-gray-500'>
            Already have an account? <Link to='/login' className='text-primary font-bold hover:underline'>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
