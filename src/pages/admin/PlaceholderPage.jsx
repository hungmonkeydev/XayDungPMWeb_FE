// src/pages/admin/PlaceholderPage.jsx
// Dùng tạm cho các trang chưa xây dựng giao diện

function PlaceholderPage({ title, description }) {
  return (
    <div className="p-6 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-stone-400">
            <path d="M12 6v6l4 2M12 2a10 10 0 100 20A10 10 0 0012 2z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-stone-900 mb-1">{title}</h2>
        <p className="text-sm text-stone-400 max-w-xs mx-auto">{description}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-stone-500 bg-stone-50 border border-stone-100 px-3 py-2 rounded-lg">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          Đang phát triển — API chưa hoàn thiện
        </div>
      </div>
    </div>
  );
}

export function ProductsPage() {
  return <PlaceholderPage title="Quản lý Sản phẩm" description="Hiển thị toàn bộ sản phẩm, biến thể màu sắc, kích thước và tồn kho." />;
}

export function OrdersPage() {
  return <PlaceholderPage title="Quản lý Đơn hàng" description="Theo dõi, xác nhận và cập nhật trạng thái đơn hàng từ khách." />;
}

export function CustomersPage() {
  return <PlaceholderPage title="Quản lý Khách hàng" description="Xem thông tin, lịch sử mua hàng và trạng thái tài khoản." />;
}

export function PromotionsPage() {
  return <PlaceholderPage title="Quản lý Khuyến mãi" description="Tạo và quản lý mã giảm giá, chiến dịch theo danh mục sản phẩm." />;
}

export function StaffPage() {
  return <PlaceholderPage title="Quản lý Nhân viên" description="Phân quyền Admin / Staff và quản lý tài khoản nhân sự." />;
}
