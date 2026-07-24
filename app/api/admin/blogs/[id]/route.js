import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function PATCH(request, { params }) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  const { id } = await params;
  let body;
  try { body = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  try {
    const allowed = ['title', 'desc', 'content', 'grad', 'status'];
    const update = {};
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = typeof body[key] === 'string' ? body[key].trim() : body[key];
    }
    const blog = await Blog.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true });
    if (!blog) return Response.json({ success: false, error: 'Không tìm thấy bài viết.' }, { status: 404 });
    return Response.json({ success: true, blog });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  const { id } = await params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return Response.json({ success: false, error: 'Không tìm thấy bài viết.' }, { status: 404 });
    return Response.json({ success: true, message: 'Đã xóa bài viết.' });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
