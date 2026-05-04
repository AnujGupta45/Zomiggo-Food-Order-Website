import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, LayoutDashboard, Utensils, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      toast.success('Restaurant deleted (mock)');
      setRestaurants(restaurants.filter(r => r._id !== id));
    }
  };

  return (
    <div className='flex flex-col md:flex-row gap-8 py-8'>
      {/* Sidebar */}
      <div className='w-full md:w-64 space-y-2'>
        <button 
          onClick={() => setActiveTab('restaurants')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'restaurants' ? 'bg-primary text-white shadow-lg shadow-orange-200' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Utensils size={20} />
          <span>Restaurants</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-orange-200' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ShoppingBag size={20} />
          <span>Orders</span>
        </button>
      </div>

      {/* Main Content */}
      <div className='flex-grow bg-white p-8 rounded-3xl shadow-sm border border-gray-100'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold text-gray-800 capitalize'>{activeTab} Management</h2>
          <button className='bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-orange-600 transition-colors'>
            <Plus size={20} className='mr-2' /> Add New
          </button>
        </div>

        {activeTab === 'restaurants' ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='text-gray-400 border-b'>
                  <th className='pb-4 font-medium'>Restaurant</th>
                  <th className='pb-4 font-medium'>Rating</th>
                  <th className='pb-4 font-medium'>Cuisines</th>
                  <th className='pb-4 font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y'>
                {restaurants.map(res => (
                  <tr key={res._id} className='group hover:bg-gray-50 transition-colors'>
                    <td className='py-4 flex items-center'>
                      <img src={res.image} alt={res.name} className='w-12 h-12 rounded-lg object-cover mr-4' />
                      <span className='font-bold text-gray-700'>{res.name}</span>
                    </td>
                    <td className='py-4'>
                      <span className='bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold'>
                        ★ {res.rating}
                      </span>
                    </td>
                    <td className='py-4 text-gray-500 text-sm'>{res.cuisines?.join(', ')}</td>
                    <td className='py-4'>
                      <div className='flex space-x-2'>
                        <button className='p-2 text-blue-500 hover:bg-blue-50 rounded-lg'><Edit size={18} /></button>
                        <button onClick={() => handleDelete(res._id)} className='p-2 text-red-500 hover:bg-red-50 rounded-lg'><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='text-center py-12 text-gray-400'>
            <ShoppingBag size={48} className='mx-auto mb-4 opacity-20' />
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
