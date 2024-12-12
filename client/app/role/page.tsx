import { currentUser } from '@clerk/nextjs/server';
import Tittle from './components/Tittle';
import { redirect } from 'next/navigation';
import RoleSelect from './components/RoleSelect';
import RoleInfo from './components/RoleInfo';

async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }
  return (
    <div className='flex items-center justify-center mt-20 flex-col gap-2 '>
      <Tittle />
      <RoleInfo />
    </div>
  );
}

export default Page;
