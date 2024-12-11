import { Router } from 'express';
import { clerkController } from './clerk.controller';

const clerkRoute = Router();

clerkRoute.post('/', clerkController.handleWebhook);

export default clerkRoute;
