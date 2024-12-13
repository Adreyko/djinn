export interface IJob {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  employer: string;
  salary: {
    min: number;
    max: number;
  };
  location: {
    type: string;
    city: string;
    country: string;
  };
  employmentType: string;
  skills: string[];
  benefits: string[];
  status: string;
  applicantsCount: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
