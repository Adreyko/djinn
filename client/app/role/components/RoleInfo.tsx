'use client';
import { useUser } from '@/core/user';
import React, { useEffect } from 'react';
import RoleSelect from './RoleSelect';
import { RoleDto, RoleType } from '@/shared/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const RoleInfo = () => {
  const { user, isLoading } = useUser();

  const [role, setRole] = React.useState<RoleType | null>(user?.role ?? null);

  useEffect(() => {
    setRole(user?.role ?? null);
  }, [user]);

  if (!role && !isLoading) {
    return <RoleSelect onSuccess={setRole} />;
  }
  return (
    <>
      {isLoading ? (
        <div className='animate-pulse h-24 w-80'>
          <div className='h-4 bg-gray-300 rounded mb-1'></div>
          <div className='h-10 bg-gray-300 rounded mb-1'></div>
          <div className='h-10 bg-gray-300 rounded'></div>
        </div>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center'>
          <div className='text-md'>
            Your account has the role of
            <span className='font-black'>{role}</span>.
          </div>
          <Link href={'/jobs'} className='flex gap-1 items-center underline'>
            Go to available jobs <ArrowRight size={16} />
          </Link>
          <div className='text-xs'>
            Something wrong? Contact with us by email -{' '}
            <a
              href='mailto:example@gmail.com'
              className='text-blue-500 underline'
            >
              example@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleInfo;
