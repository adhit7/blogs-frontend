import React, { useState } from 'react';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { z } from 'zod';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { extractErrorMessage } from '../lib/extractErrorMessage';
import api from '../lib/api';
import { useUserContext } from '../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const categories = [
  {
    name: 'Tech',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Lifestyle',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Travel',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Food',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
];

const validCategories = categories.map((c) => c.name);

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),

  content: z.string().min(1, 'Content is required'),
  image: z.string().optional(),

  category: z
    .string({
      required_error: 'Category is required',
      invalid_type_error: 'Please select a valid category',
    })
    .refine((val) => validCategories.includes(val), {
      message: 'Please select a valid category',
    }),
});

const BlogForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUserContext();
  const location = useLocation();
  const defaultValues = location.state?.blog;
  const navigate = useNavigate();
  const redirectPath = location.state?.from || '/';

  const methods = useForm({
    resolver: zodResolver(blogSchema),
  });

  const handleSubmit = async (formValues) => {
    setLoading(true);

    let { title, content, image, category } = formValues;
    const { name, userId } = user;

    const categoryObj = categories.find((cat) => cat.name === category);

    if (!image) {
      image = categoryObj.image;
    }

    const values = {
      title,
      content,
      author: name,
      image,
      category,
      userId,
    };

    try {
      let res;
      if (defaultValues) {
        res = await api.put(`/blog/edit/${defaultValues?._id}`, values);
      } else {
        res = await api.post('/blog/add', values);
      }
      if (res) {
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Blog Add/Edit failed');

      toast.error(errorMessage, {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/blog/delete/${defaultValues?._id}`);
      if (res) {
        toast.success('Successfully Deleted', {
          position: 'top-right',
        });
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error, 'Blog Delete failed');
      toast.error(errorMessage, {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  return (
    <div className='mt-10 p-2 sm:p-0'>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className='max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-5'
        >
          <h2 className='text-2xl font-bold text-gray-800'>Blog</h2>

          <Input
            name='title'
            label='Title'
            type='text'
            placeholder='Enter your Blog Title'
            inputClass='focus:border-blog-blue border-gray-300 sm:shadow-none'
          />

          <TextArea
            name='content'
            label='Content'
            placeholder='Enter your Blog Content'
            inputClass='focus:border-blog-blue border-gray-300 sm:shadow-none'
            rows={10}
          />

          <div className='mb-4'>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Category
            </label>
            <select
              {...methods.register('category')}
              id='category'
              className='block w-full rounded-md border px-2 py-2 shadow-sm sm:text-sm focus:border-blog-blue border-gray-300'
              defaultValue=''
            >
              <option value='' disabled>
                Select a category
              </option>
              {categories.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {methods.formState.errors.category && (
              <p className='mt-1 text-sm text-red-600'>
                {methods.formState.errors.category.message}
              </p>
            )}
          </div>

          <Input
            name='image'
            label='Image (Optional)'
            type='text'
            placeholder='Enter your Blog Image'
            inputClass='focus:border-blog-blue border-gray-300 sm:shadow-none'
          />

          <div>
            <button
              type='submit'
              className={`w-full py-2 rounded transition-colors duration-200 ${
                loading
                  ? 'bg-blog-blue/60 cursor-not-allowed'
                  : 'bg-blog-blue hover:bg-[#2b8ee6]'
              } text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blog-blue`}
              disabled={loading}
            >
              Submit
            </button>
            {defaultValues && (
              <button
                type='button'
                className={`w-full  py-2 my-2 rounded transition-colors duration-200 bg-red-500/90 text-white font-semibold focus:outline-none`}
                disabled={loading}
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default BlogForm;
