export default function AdminTopbar({ title }) {
  return (
    <div className="admin-topbar">
      <h2>{title}</h2>
      <div className="admin-topbar-right">
        <span>👤 Admin</span>
      </div>
    </div>
  );
}
