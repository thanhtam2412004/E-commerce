import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function PATCH(request, { params }) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  const { id } = await params;
  let body;
  try { body = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  try {
    const update = {};
    if (body.name !== undefined) update.name = body.name.trim();
    if (body.desc !== undefined) update.desc = body.desc.trim();
    const category = await Category.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true });
    if (!category) return Response.json({ success: false, error: 'Không tìm thấy danh mục.' }, { status: 404 });
    return Response.json({ success: true, category });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  const { id } = await params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) return Response.json({ success: false, error: 'Không tìm thấy danh mục.' }, { status: 404 });
    return Response.json({ success: true, message: 'Đã xóa danh mục.' });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
