import React from 'react';
import { useFormContext } from 'react-hook-form';

const Input = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  inputClass = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm ${inputClass} ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        }`}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default Input;
