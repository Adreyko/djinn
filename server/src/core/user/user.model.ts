import { IUser } from '@djinn/models';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'user' },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model('User', UserSchema);
