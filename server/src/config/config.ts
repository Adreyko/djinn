import dotenv from 'dotenv';

dotenv.config({ debug: true });

export const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI ?? '',
  CLERK: process.env.SIGNING_SECRET,
};
