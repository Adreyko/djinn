export interface ICompany {
  name: string;
  employeeAmount: number;
  logo: string;
}

export type EmploymentType =
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'internship'
  | 'freelance'
  | 'office';

export interface IJob {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  yearsOfExperience: number;
  position: string;
  company: ICompany;
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
  employmentType: EmploymentType;
  skills: string[];
  benefits: string[];
  status: string;
  applicantsCount: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
