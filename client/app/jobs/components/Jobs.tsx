'use client';
import { CardLoader } from '@/shared/components/ui/loaders/card-loader';
import { IJob } from '@/shared/types/job/job.interface';
import { LogsIcon } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { getCreatedTime } from '@/shared/lib/utils';

interface JobsProps {
  jobs: IJob[];
  isLoading: boolean;
}
const Jobs: FC<JobsProps> = ({ jobs, isLoading }) => {
  if (isLoading) {
    return new Array(5).fill(0).map((_, index) => <CardLoader key={index} />);
  }
  return (
    <>
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
  applicantsCount,
  location,
  requirements,
  company,
  yearsOfExperience,
  createdAt,
}: IJob) => {
  return (
    <div className='p-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <LogsIcon className='w-5 h-5' />
          <span className='text-gray-400 text-sm'>{company.name}</span>
          <span className='text-gray-400 text-sm'>
            {applicantsCount} applied
          </span>
          <span className='text-gray-400 text-sm'>
            {getCreatedTime(createdAt)}
          </span>
        </div>

        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <Link href={'/job'}>
                <h2 className='text-blue-400 text-2xl underline'>{title}</h2>
              </Link>
              <h3 className='font-medium text-green-500'>
                {salary.min}$ - {salary.max}$
              </h3>
            </div>

            <div className='flex flex-col gap-1'>
              <p className='text-gray-400 text-sm'>
                {location.type} • {location.country} • {yearsOfExperience} years
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
