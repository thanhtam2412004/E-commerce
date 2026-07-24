import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// PATCH /api/admin/products/[id]
export async function PATCH(request, { params }) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;
  let body;
  try { body = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  try {
    const allowed = ['name', 'tag', 'cat', 'desc', 'price', 'rawPrice', 'stock', 'grad', 'isFeatured'];
    const update = {};
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key];
    }
    if (body.price !== undefined) update.rawPrice = Number(body.price);

    const product = await Product.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true });
    if (!product) return Response.json({ success: false, error: 'Không tìm thấy sản phẩm.' }, { status: 404 });
    return Response.json({ success: true, product });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}

// DELETE /api/admin/products/[id]
export async function DELETE(request, { params }) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return Response.json({ success: false, error: 'Không tìm thấy sản phẩm.' }, { status: 404 });
    return Response.json({ success: true, message: 'Đã xóa sản phẩm.' });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
