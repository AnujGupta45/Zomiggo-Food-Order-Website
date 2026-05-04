import React from 'react';
import { ShoppingCart, Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-[#02060c] text-white pt-20 pb-10'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
          <div className='space-y-6'>
            <Link to='/' className='flex items-center space-x-2'>
              <div className='bg-primary p-1.5 rounded-lg'>
                <ShoppingCart className='text-white' size={24} />
              </div>
              <span className='text-white text-2xl font-black tracking-tight'>Zomiggo</span>
            </Link>
            <p className='text-gray-400 font-medium leading-relaxed'>
              Delivering happiness to your doorstep, one meal at a time. The best restaurants at your fingertips.
            </p>
            <div className='flex space-x-4'>
              <a href='#' className='p-2 bg-white/5 hover:bg-primary transition-colors rounded-lg'><Globe size={20} /></a>
              <a href='#' className='p-2 bg-white/5 hover:bg-primary transition-colors rounded-lg'><Share2 size={20} /></a>
              <a href='#' className='p-2 bg-white/5 hover:bg-primary transition-colors rounded-lg'><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm'>Company</h3>
            <ul className='space-y-4 text-gray-400 font-medium'>
              <li><Link to='/about' className='hover:text-primary transition-colors'>About Us</Link></li>
              <li><Link to='/careers' className='hover:text-primary transition-colors'>Team</Link></li>
              <li><Link to='/blog' className='hover:text-primary transition-colors'>Zomiggo One</Link></li>
              <li><Link to='/contact' className='hover:text-primary transition-colors'>Instamart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm'>Contact us</h3>
            <ul className='space-y-4 text-gray-400 font-medium'>
              <li><Link to='/help' className='hover:text-primary transition-colors'>Help & Support</Link></li>
              <li><Link to='/partner' className='hover:text-primary transition-colors'>Partner with us</Link></li>
              <li><Link to='/ride' className='hover:text-primary transition-colors'>Ride with us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm'>Available in</h3>
            <ul className='space-y-4 text-gray-400 font-medium'>
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>

        <div className='pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6'>
          <p className='text-gray-500 text-sm font-medium'>
            © 2026 Bundl Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className='flex space-x-8 text-gray-500 text-sm font-medium'>
            <a href='#' className='hover:text-white transition-colors'>Privacy Policy</a>
            <a href='#' className='hover:text-white transition-colors'>Terms of Service</a>
            <a href='#' className='hover:text-white transition-colors'>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
