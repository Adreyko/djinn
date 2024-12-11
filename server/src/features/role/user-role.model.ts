import mongoose, { Schema } from 'mongoose';

const UserRoleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

UserRoleSchema.index({ user: 1, role: 1 }, { unique: true });

export const UserRoleModel = mongoose.model('UserRole', UserRoleSchema);
