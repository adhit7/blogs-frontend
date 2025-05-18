import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Importing the "door out" icon from react-icons
import { useUserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { logout } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className='w-full flex justify-between items-center p-2 sm:px-6 sm:py-4 bg-gray-900 '>
      <div onClick={() => navigate('/')} className='cursor-pointer'>
        <h1 className='text-lg sm:text-2xl text-blog-blue'>
          AD <span className='text-gray-400'>Blogz</span>
        </h1>
      </div>

      <div className='flex items-center'>
        <button
          className='text-[.8rem] sm:text-base p-1 sm:px-2 sm:py-1 rounded text-white hover:bg-gray-500 hover:text-grey border focus:outline-none cursor-pointer mx-2 sm:mx-6'
          onClick={() => navigate('/blog/new')}
        >
          New
        </button>
        <Link onClick={logout} className='text-[#111418] text-2xl text-white'>
          <FaSignOutAlt />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
