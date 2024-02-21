import mongoose from 'mongoose';
import { DB_NAME } from '../constants/commonConstants.js';

const connectDB = async () => {
  try {
    console.log(`${process.env.MONGODB_URL}/${DB_NAME}`);
    const db = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`Database connected at host: ${db.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection failed: ', error);
    process.exit(1);
  }
};

export default connectDB;
