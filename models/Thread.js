import mongoose from 'mongoose'

const ThreadSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  timestamp: String,
  comments: [
    {
      id: String,
      content: String,
      timestamp: String,
    },
  ],
});


export default mongoose.model('Thread', ThreadSchema);
