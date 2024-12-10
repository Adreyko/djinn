import express, { Express } from 'express';

import cors from 'cors';

import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import userRouter from './core/user/user.routes';
import { config } from './config/config';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use('/api/webhook', userRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
