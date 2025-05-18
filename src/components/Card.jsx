import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const Card = ({ blog }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleNavigate = () => {
    console.log('22', blog.userId, user.userId, blog.userId === user.userId);
    if (blog.userId === user.userId) {
      navigate('/blog/edit', { state: { blog: blog } });
    } else {
      navigate('/blog/view', {
        state: { blog: blog, currentUserId: user.userId },
      });
    }
  };

  return (
    <div
      key={blog.id}
      className='bg-white shadow rounded-lg overflow-hidden'
      onClick={handleNavigate}
    >
      {blog.image && (
        <div className='h-40 sm:h-48 bg-gray-300'>
          <img
            src={blog.image}
            alt={blog.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}
      <div className='p-3 sm:p-4'>
        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
          {blog.title}
        </h3>

        <p className='text-sm text-gray-600'>
          by{' '}
          {blog.userId === user.userId
            ? 'Myself'
            : blog.author || 'Unknown Author'}
        </p>
      </div>
    </div>
  );
};

export default Card;
