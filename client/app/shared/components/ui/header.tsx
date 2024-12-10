'use client';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className='h-[var(--header-height)] flex items-center justify-center'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <div className='text-2xl flex items-center cursor-pointer'>
            Logo🇺🇦
          </div>
        </Link>
        {isSignedIn ? <UserButton /> : <SignInButton />}
      </div>
    </div>
  );
};

export default Header;
