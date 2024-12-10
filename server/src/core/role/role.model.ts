import mongoose, { Schema } from 'mongoose';

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['employee', 'employer'],
    },
  },
  {
    timestamps: true,
  }
);

export const RoleModel = mongoose.model('Role', RoleSchema);
