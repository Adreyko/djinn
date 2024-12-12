import { navigationItems } from '@/shared/lib/navigation';
import Link from 'next/link';

import React from 'react';

const Navigation = () => {
  return (
    <div className='flex '>
      {navigationItems.map((nav) => (
        <div key={nav.name} className='p-2'>
          <Link href={nav.href}>{nav.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
