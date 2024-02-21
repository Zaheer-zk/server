import mongoose from 'mongoose';

const adminUserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export const Admin = mongoose.model('Admin', adminUserSchema);
