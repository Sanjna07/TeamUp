import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
}, {
  timestamps: true // auto adds createdAt, updatedAt
});

export default mongoose.model('Room', roomSchema);
