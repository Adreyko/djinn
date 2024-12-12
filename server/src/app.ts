import express, { Express } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import userRouter from './core/user/user.routes';
import { config } from './config/config';
import roleRouter from './features/role/role.routes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import clerkRoute from './core/clerk/clerk.routes';
import validateClerkToken from './middlewares/validateClerk';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use('/api/user', validateClerkToken, userRouter);
app.use('/api/webhook', clerkRoute);
app.use('/api/role', validateClerkToken, roleRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

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
