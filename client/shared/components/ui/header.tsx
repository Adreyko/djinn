'use client';
import { useUser } from '@/core/user';
import { UserButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import AvatarLoader from './loaders/avatar-loader';
import Navigation from './navigation';

const Header = () => {
  const { isAuthenticated, isLoading } = useUser();
  return (
    <div className='h-[var(--header-height)] flex items-center justify-center border-b'>
      <div className='container flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <Link href='/'>
            <div className='text-2xl flex items-center cursor-pointer'>
              Logo🇺🇦
            </div>
          </Link>
          <Navigation />
        </div>
        {isAuthenticated ? <UserButton /> : <SignUpButton />}
        {isLoading && !isAuthenticated && <AvatarLoader />}
      </div>
    </div>
  );
};

export default Header;
