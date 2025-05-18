import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../lib/api';
import { toast } from 'react-toastify';
import CardSkeleton from '../components/CardSkeleton';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/blog/all');

      setBlogs(data);
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        'Getting all blogs failed'
      );

      toast.error(errorMessage, {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogs?.length === 0) {
      getBlogs();
    }
  }, []);

  return (
    <div className='flex flex-col'>
      <main className='px-4 sm:px-6'>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-10'>
          {loading
            ? Array(3)
                .fill(0)
                .map((_, idx) => <CardSkeleton key={idx} />)
            : blogs?.map((blog) => <Card key={blog._id} blog={blog} />)}
          {!loading && blogs?.length === 0 && (
            <p className='text-center text-gray-500'>No blogs found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
