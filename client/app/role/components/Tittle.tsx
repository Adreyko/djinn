'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

const Tittle = () => {
  const { user } = useUser();
  return (
    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
      Welcome, {user?.fullName ? user.fullName : 'Stranger'}!
    </h1>
  );
};

export default Tittle;
