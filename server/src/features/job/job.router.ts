import { Router } from 'express';
import { jobController, JobController } from './job.controller';

const jobRouter = Router();

jobRouter.get('/', jobController.getJobs);

export default jobRouter;
