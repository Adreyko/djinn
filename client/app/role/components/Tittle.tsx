'use client';

import { useUser } from '@/core/user';
import React from 'react';

const Tittle = () => {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <div className='animate-pulse h-10 w-80'>
        <div className='bg-gray-300 rounded h-10'></div>
      </div>
    );

  return (
    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
      Welcome, {user?.firstName ? user.firstName : 'Stranger'}!
    </h1>
  );
};

export default Tittle;
