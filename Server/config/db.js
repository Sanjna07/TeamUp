import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected 🚀');
  } catch (err) {
    console.error('MongoDB Error:', err.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;
