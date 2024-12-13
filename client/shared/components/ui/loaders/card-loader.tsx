export const CardLoader = () => {
  return (
    <div className='p-4 animate-pulse'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 bg-gray-300 rounded-full' />
          <div className='w-36 h-5 bg-gray-300 rounded' />
        </div>

        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <div className='w-[400px] h-6 bg-gray-300 rounded' />
              <div className='w-36 h-6 bg-gray-300 rounded' />
            </div>

            <div className='flex flex-col gap-1'>
              <div className='w-32 h-4 bg-gray-300 rounded' />
              <div className='w-full h-20 bg-gray-300 rounded' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
