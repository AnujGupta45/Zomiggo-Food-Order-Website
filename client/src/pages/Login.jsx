import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock login for now
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('token', 'mock_token');
        localStorage.setItem('user', JSON.stringify({ name: 'User', email: formData.email, role: 'user' }));
        toast.success('Logged in successfully!');
        navigate('/');
        window.location.reload(); // Refresh to update context
      } else {
        toast.error('Please fill all fields');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className='flex items-center justify-center py-12 px-4'>
      <div className='bg-white p-8 rounded-3xl shadow-xl w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
          <p className='text-gray-500'>Sign in to continue ordering delicious food</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
              <input 
                type='email' 
                required
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                placeholder='you@example.com'
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                className='w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                placeholder='••••••••'
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type='submit'
            disabled={loading}
            className='w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center'
          >
            {loading ? <Loader2 className='animate-spin' size={24} /> : 'Sign In'}
          </button>
        </form>

        <div className='mt-8 text-center'>
          <p className='text-gray-500'>
            Don't have an account? <Link to='/signup' className='text-primary font-bold hover:underline'>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
