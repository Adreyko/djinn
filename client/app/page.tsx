'use client';

import { useGetUser } from '@/shared/api/hooks/user/useGetUser';

export default function Home() {
  const { data } = useGetUser();

  console.log(data);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 '></main>
  );
}
