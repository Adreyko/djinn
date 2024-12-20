import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    yearsOfExperience: { type: Number, required: true },
    position: { type: String, required: true },
    company: {
      name: { type: String, required: true },
      employeeAmount: { type: Number, required: true },
      logo: { type: String, required: true },
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    location: {
      type: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    employmentType: {
      type: String,
      required: true,
      enum: [
        'full-time',
        'part-time',
        'contract',
        'internship',
        'freelance',
        'office',
      ],
    },
    skills: { type: [String], required: true },
    benefits: { type: [String], required: true },
    status: { type: String, required: true },
    applicantsCount: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const JobModel = mongoose.model('Job', JobSchema);
