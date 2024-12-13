import React from 'react';

const Title = ({ count }: { count: number | undefined }) => {
  return (
    <h1 className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl mb-8'>
      Available vacancies - <span className='text-gray-500'>{count ?? 0}</span>
    </h1>
  );
};

export default Title;
