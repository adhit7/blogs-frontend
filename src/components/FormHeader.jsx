import React from 'react';

const FormHeader = ({ children }) => (
  <div className='sm:mx-auto sm:w-full sm:max-w-md'>
    <h2 className='mt-6 mb-6 text-center text-3xl font-bold text-gray-900'>
      {children}
    </h2>
  </div>
);

export default FormHeader;
