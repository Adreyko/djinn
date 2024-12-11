import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validateRequest = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.message,
        });
      } else {
        res.status(400).json({
          error: 'Validation failed',
          details: 'Unknown error occurred',
        });
      }
    }
  };
};
