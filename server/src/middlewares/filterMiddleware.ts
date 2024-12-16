import { NextFunction, Request, Response } from 'express';
import { parse } from 'path';

export interface FiltersRequest extends Request {
  aggregatePipeline?: PipelineFilters[];
}

interface MatchStage {
  $match: Record<string, unknown>;
}

interface SortStage {
  $sort: Record<string, 1 | -1>;
}

interface CountStage {
  $count: string;
}

interface AddFieldsStage {
  $addFields: Record<string, unknown>;
}

interface SkipStage {
  $skip: number;
}

interface LimitStage {
  $limit: number;
}

interface FacetStage {
  $facet: {
    metadata: (CountStage | AddFieldsStage)[];
    data: (SkipStage | LimitStage)[];
  };
}

export type PipelineFilters = MatchStage | SortStage | FacetStage;

export const filtersMiddleware = (
  req: FiltersRequest,
  res: Response,
  next: NextFunction
) => {
  const pipelines: PipelineFilters[] = [];

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const filters = {
    ...(req.query.salary && {
      'salary.max': { $gte: parseInt(req.query.salary as unknown as string) },
    }),
    ...(req.query.jobType && {
      employmentType: { $in: req.query.jobType },
    }),
    ...(req.query.company && {
      'company.name': {
        $regex: req.query.company,
        $options: 'i',
      },
    }),
    ...(req.query.years && {
      yearsOfExperience: {
        $in: (req.query.years as string[]).map((year) => parseInt(year)),
      },
    }),
    ...(req.query.position && {
      position: { $regex: req.query.position, $options: 'i' },
    }),
  };

  if (Object.keys(filters).length > 0) {
    pipelines.push({ $match: filters });
  }

  pipelines.push({ $sort: { createdAt: -1 } });

  pipelines.push({
    $facet: {
      metadata: [
        { $count: 'total' },
        {
          $addFields: {
            page,
            limit,
            totalPages: {
              $ceil: { $divide: ['$total', limit] },
            },
          },
        },
      ],
      data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
    },
  });

  req.aggregatePipeline = pipelines;
  next();
};
