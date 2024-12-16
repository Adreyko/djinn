import { Request, Response } from 'express';
import { jobService, JobService } from './job.service';
import { FiltersRequest } from '../../middlewares/filterMiddleware';

export class JobController {
  constructor(private readonly jobService: JobService) {}

  public getJobs = async (
    req: FiltersRequest,
    res: Response
  ): Promise<void> => {
    try {
      const filters = req.aggregatePipeline;
      const jobs = await this.jobService.getJobs(filters ?? []);
      res.status(200).json(jobs);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: error.message });
    }
  };

  public getJobsCount = async (req: FiltersRequest, res: Response) => {
    try {
      const filters = req.aggregatePipeline;
      const jobs = await this.jobService.getJobsCount(filters ?? []);
      res.status(200).json(jobs);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: error.message });
    }
  };

  public getJobCompanies = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const companies = await this.jobService.getJobCompanies();
      res.status(200).json(companies);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: error.message });
    }
  };
}

export const jobController = new JobController(jobService);
