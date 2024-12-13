import { Request, Response } from 'express';
import { jobService, JobService } from './job.service';

export class JobController {
  constructor(private readonly jobService: JobService) {}

  public getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      const jobs = await this.jobService.getJobs();
      res.status(200).json(jobs);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: error.message });
    }
  };
}

export const jobController = new JobController(jobService);
