import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
  grad: { type: String, default: '' },
});

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    // Thông tin người nhận
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      note: { type: String, default: '' },
    },
    // Liên kết user nếu đã đăng nhập (tuỳ chọn)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: [(arr) => arr.length > 0, 'Đơn hàng phải có ít nhất 1 sản phẩm'],
    },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 30000 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'bank'],
      default: 'cod',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipping', 'done', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Tự động sinh orderNumber dạng #GA-xxxx trước khi lưu
OrderSchema.pre('save', async function () {
  if (this.isNew) {
    const count = await mongoose.models.Order.countDocuments();
    this.orderNumber = `#GA-${String(1000 + count + 1).padStart(4, '0')}`;
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
