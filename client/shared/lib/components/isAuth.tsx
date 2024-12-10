'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function IsAuth(Component: any) {
  const { user, isLoaded } = useUser();
  return function IsAuth(props: any) {
    useEffect(() => {
      if (!user && isLoaded) {
        return redirect('/');
      }
    }, []);

    if (!user && isLoaded) {
      return null;
    }

    return <Component {...props} />;
  };
}
