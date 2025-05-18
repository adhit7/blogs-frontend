import React from 'react';

const CardSkeleton = () => {
  return (
    <div className='bg-white shadow rounded-lg overflow-hidden animate-pulse'>
      <div className='h-40 sm:h-48 bg-gray-300' />

      <div className='p-3 sm:p-4'>
        <div className='h-5 bg-gray-300 rounded w-3/4 mb-2'></div>
        <div className='h-4 bg-gray-300 rounded w-1/2'></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
