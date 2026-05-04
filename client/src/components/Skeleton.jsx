import React from 'react';

const Skeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='bg-gray-200 h-48 w-full rounded-2xl mb-4'></div>
      <div className='bg-gray-200 h-6 w-3/4 rounded mb-2'></div>
      <div className='bg-gray-200 h-4 w-1/2 rounded'></div>
    </div>
  );
};

export default Skeleton;
