import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Djinni API',
      version: '1.0.0',
      description: 'API documentation for Djinni',
    },
    servers: [
      {
        url: config.host,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/core/**/*.ts', './src/features/**/*.ts'],
};

export const specs = swaggerJsdoc(options);
