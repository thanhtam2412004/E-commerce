import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tiêu đề bài viết'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    desc: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    grad: {
      type: String,
      default: 'linear-gradient(160deg,#DCE6C8,#B9C9A6)',
    },
    author: {
      type: String,
      default: 'Green Atelier Editorial',
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
