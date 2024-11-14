import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});

export const Post = mongoose.model('Post', PostSchema);
