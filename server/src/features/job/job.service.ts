import mongoose from 'mongoose';
import { userService, UserService } from '../../core/user/user.service';
import { JobModel } from './job.model';
import { IJob } from './types/job.interface';

export class JobService {
  constructor(private jobModel: typeof JobModel, userService: UserService) {}

  public getJobs = async (): Promise<IJob[]> => {
    const jobs = await this.jobModel.find({});
    return jobs.map(this.jobMapper);
  };

  private jobMapper = (job: any): IJob => {
    return {
      id: job._id,
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      employer: job.employer,
      employmentType: job.employmentType,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      location: job.location,
      salary: job.salary,
      skills: job.skills,
      benefits: job.benefits,
      status: job.status,
      applicantsCount: job.applicantsCount,
      expiresAt: job.expiresAt,
    };
  };

  private createMockedJobs = async (): Promise<void> => {
    const mockedJobs: Partial<IJob>[] = [
      {
        title: 'Software Engineer',
        description:
          'Develop and maintain software applications.Develop and maintain software applications.Develop and maintain software applications.Develop and maintain software applications.Develop and maintain software applications.Develop and maintain software applications.Develop and maintain software applications.',
        requirements: ['3+ years of experience in software development.'],
        employer: new mongoose.Types.ObjectId(
          '675acfc8941006ebe5d01728'
        ) as any,
        employmentType: 'Full-time',
        location: { type: 'Remote', city: 'Lviv', country: 'Ukraine' },
        salary: { min: 100000, max: 140000 },
        skills: ['JavaScript', 'TypeScript', 'React'],
        benefits: ['Health insurance', '401(k)'],
        status: 'open',
        applicantsCount: 0,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Product Manager',
        description: 'Oversee product development and strategy.',
        requirements: ['5+ years of experience in product management.'],
        employer: new mongoose.Types.ObjectId(
          '675acfc8941006ebe5d01728'
        ) as any,
        employmentType: 'Full-time',
        location: { type: 'On-site', city: 'New York', country: 'USA' },
        salary: { min: 130000, max: 170000 },
        skills: ['Product Management', 'Agile', 'Scrum'],
        benefits: ['Health insurance', 'Stock options'],
        status: 'open',
        applicantsCount: 0,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    ];

    await this.jobModel.insertMany(mockedJobs);
  };
}

export const jobService = new JobService(JobModel, userService);
