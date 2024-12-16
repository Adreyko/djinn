import { JobModel } from './job.model';
import { IJob } from './types/job.interface';
import { PipelineFilters } from '../../middlewares/filterMiddleware';

export class JobService {
  constructor(private jobModel: typeof JobModel) {}

  public getJobs = async (filters: PipelineFilters[]): Promise<IJob[]> => {
    const [jobs] = await this.jobModel.aggregate(filters);

    return jobs.data.map(JobService.toDTO);
  };

  getJobsCount = async (filters: PipelineFilters[]): Promise<number> => {
    const [jobs] = await this.jobModel.aggregate(filters);
    return jobs.metadata[0].total;
  };

  public getJobCompanies = async (): Promise<
    {
      _id: string;
      name: string;
      logo: string;
    }[]
  > => {
    const companies = await this.jobModel.aggregate([
      {
        $group: {
          _id: '$company.name',
          name: { $first: '$company.name' },
          logo: { $first: '$company.logo' },
        },
      },
    ]);

    return companies;
  };

  private static toDTO(job: any): IJob {
    return {
      id: job._id.toString(),
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      yearsOfExperience: job.yearsOfExperience,
      position: job.position,
      company: {
        name: job.company.name,
        employeeAmount: job.company.employeeAmount,
        logo: job.company.logo,
      },
      employer: job.employer.toString(),
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
  }

  public async createMockedJobs(): Promise<void> {
    const mockedJobs: Partial<IJob>[] = [
      {
        title: 'Software Engineer',
        description: 'Develop and maintain software applications.',
        requirements: ['3+ years of experience in software development.'],
        yearsOfExperience: 3,
        position: 'Senior Developer',
        company: {
          name: 'Tech Corp',
          employeeAmount: 500,
          logo: 'https://placeholder.com/logo.png',
        },
        employer: '675acfc8941006ebe5d01728',
        employmentType: 'full-time',
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
        yearsOfExperience: 5,
        position: 'Senior Product Manager',
        company: {
          name: 'Product Co',
          employeeAmount: 200,
          logo: 'https://placeholder.com/logo2.png',
        },
        employer: '675acfc8941006ebe5d01728',
        employmentType: 'full-time',
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
  }
}

export const jobService = new JobService(JobModel);
