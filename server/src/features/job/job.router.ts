import { Router } from 'express';
import { jobController, JobController } from './job.controller';
import { filtersMiddleware } from '../../middlewares/filterMiddleware';

const jobRouter = Router();

jobRouter.get('/', filtersMiddleware, jobController.getJobs);
jobRouter.get('/count', filtersMiddleware, jobController.getJobsCount);
jobRouter.get('/companies', jobController.getJobCompanies);

export default jobRouter;
