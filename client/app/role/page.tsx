import { currentUser } from '@clerk/nextjs/server';
import Tittle from './components/Tittle';
import { redirect } from 'next/navigation';
import RoleSelect from './components/RoleSelect';

async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }
  return (
    <div className='flex items-center justify-center mt-20 flex-col gap-2 '>
      <Tittle />

      <p>Please choose what you need!</p>
      <div className='w-80'>
        <RoleSelect />
      </div>
    </div>
  );
}

export default Page;
