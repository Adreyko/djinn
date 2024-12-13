import Filters from './components/Filters/Filters';
import Jobs from './components/Jobs';
import Title from './components/Title';

export default function JobsPage() {
  return (
    <main className='flex min-h-screen gap-20'>
      <div className='w-1/2'>
        <Jobs />
      </div>
      <div className='w-1/4'>
        <Filters />
      </div>
    </main>
  );
}
