// src/pages/admin/components/AdminTopbar.jsx

import AdminIcon from "./AdminIcons";

const PAGE_META = {
  dashboard: { title: "Dashboard", sub: "Xin chào, Admin" },
  products: { title: "Sản phẩm", sub: "Quản lý danh mục & sản phẩm" },
  orders: { title: "Đơn hàng", sub: "Theo dõi & xử lý đơn hàng" },
  customers: { title: "Khách hàng", sub: "Quản lý tài khoản khách hàng" },
  promotions: { title: "Khuyến mãi", sub: "Chiến dịch & mã giảm giá" },
  staff: { title: "Nhân viên", sub: "Phân quyền & quản lý nhân sự" }
};

export default function AdminTopbar({ activePage, onToggleSidebar }) {
  const meta = PAGE_META[activePage] ?? PAGE_META.dashboard;

  return (
    <header className="h-14 bg-white border-b border-stone-100 flex items-center px-5 gap-4 flex-shrink-0">
      {/* Toggle sidebar */}
      <button
        onClick={onToggleSidebar}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition-colors"
      >
        <AdminIcon name="menu" className="w-4 h-4" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-stone-900 leading-tight truncate">{meta.title}</h1>
        <p className="text-[11px] text-stone-400 leading-tight truncate">{meta.sub}</p>
      </div>
    </header>
  );
}
