import { verifyToken } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';

export interface AuthRequest extends Request {
  auth?: {
    sub: string;
    [key: string]: any;
  };
}

export const validateClerkToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const payload = await verifyToken(token, {
      secretKey: config.CLERK_SECRET_KEY,
    });

    req.auth = payload;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({
      error: 'Invalid token',
      details: error,
    });
    return;
  }
};

export default validateClerkToken;
