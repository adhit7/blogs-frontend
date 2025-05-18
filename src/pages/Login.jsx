import React, { useState } from 'react';
import api from '../lib/api';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { z } from 'zod';

import Input from '../components/Input';
import FormHeader from '../components/FormHeader';
import { extractErrorMessage } from '../lib/extractErrorMessage';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUserContext();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (formValues) => {
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/login', formValues);
      const { token, name, _id } = res.data;

      if (token && name && _id) {
        const authData = { token, name, userId: _id };
        login(authData);
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Login failed');

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <FormHeader>Login</FormHeader>

      {error && (
        <div className='mb-4 text-red-600 text-center font-medium'>{error}</div>
      )}

      <div className='m-2 sm:mx-auto sm:w-full sm:max-w-md rounded bg-white shadow pt-8'>
        <div className='py-8 px-4 sm:px-10'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleLogin)}>
              <Input
                name='email'
                label='Email'
                type='email'
                placeholder='you@example.com'
                inputClass='focus:border-blog-blue border-gray-300 '
              />
              <Input
                name='password'
                label='Password'
                type='password'
                placeholder='******'
                inputClass='focus:border-blog-blue border-gray-300 '
              />

              <div className='mt-7'>
                <button
                  type='submit'
                  className={`w-full py-2 rounded transition-colors duration-200 ${
                    loading
                      ? 'bg-blog-blue/60 cursor-not-allowed'
                      : 'bg-blog-blue hover:bg-blog-blue-dark'
                  } text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blog-blue`}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </FormProvider>

          <div className='mt-4 text-sm text-center'>
            <Link
              to='/signup'
              className='text-blog-blue hover:text-blog-blue-dark'
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
