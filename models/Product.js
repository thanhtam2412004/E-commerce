import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên sản phẩm'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tag: {
      type: String,
      enum: ['Focus', 'Energy', 'Calm', 'Beauty', 'Immunity'],
      required: true,
    },
    cat: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Giá không thể âm'],
    },
    rawPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Tồn kho không thể âm'],
      default: 0,
    },
    grad: {
      type: String,
      default: 'linear-gradient(150deg,#DCE6C8,#B9C9A6)',
    },
    images: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes để truy vấn nhanh theo slug và tag
ProductSchema.index({ slug: 1 });
ProductSchema.index({ tag: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
