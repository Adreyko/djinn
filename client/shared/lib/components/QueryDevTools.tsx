'use client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const QueryDevTools = () => {
  return <ReactQueryDevtools initialIsOpen={false} />;
};

export default QueryDevTools;
