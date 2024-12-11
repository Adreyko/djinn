import dotenv from 'dotenv';

dotenv.config({ debug: true });

export const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI ?? '',
  CLERK: process.env.SIGNING_SECRET,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_ISSUER: process.env.CLERK_ISSUER,
};
