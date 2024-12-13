'use client';
import { useGetJobs } from '@/shared/api/hooks/job/useGetJobs';
import { CardLoader } from '@/shared/components/ui/loaders/card-loader';
import { IJob } from '@/shared/types/job.interface';
import { LogsIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Title from './Title';

const Jobs = () => {
  const { data: jobs, isLoading } = useGetJobs();

  if (isLoading) {
    return new Array(5).fill(0).map((_, index) => <CardLoader key={index} />);
  }
  return (
    <>
      <Title count={jobs?.length} />
      <div className='flex flex-col'>
        {jobs?.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </>
  );
};

const JobCard = ({
  id,
  title,
  description,
  salary,
  employer,
  applicantsCount,
  location,
  requirements,
}: IJob) => {
  return (
    <div className='p-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <LogsIcon className='w-5 h-5' />
          {/* <span className='text-gray-400 text-sm'>{employer.name}</span> */}
          <span className='text-gray-400 text-sm'>
            {applicantsCount} applied
          </span>
        </div>

        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <Link href={'/job'}>
                <h2 className='text-blue-400 text-2xl underline '>{title}</h2>
              </Link>
              <h3 className='font-medium text-green-500'>
                {salary.min}$ - {salary.max}$
              </h3>
            </div>

            <div className='flex flex-col gap-1'>
              <p className='text-gray-400 text-sm'>
                {location.type} • {location.country} • {requirements[0]}
              </p>
              <p className='text-gray-400 text-sm'>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
