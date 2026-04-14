import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AccountLayout({ children, breadcrumb }) {
  const { user, handleLogout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span>🏠</span>
          <Link to="/" className="hover:text-amber-600 transition-colors">Trang chủ</Link>
          <span>›</span>
          {breadcrumb ? (
            <>
              <Link to="/profile" className="hover:text-amber-600 transition-colors">Tài khoản</Link>
              <span>›</span>
              <span className="text-gray-800 font-medium">{breadcrumb}</span>
            </>
          ) : (
            <span className="text-gray-800 font-medium">Tài khoản</span>
          )}
        </nav>

        {/* 2 Ô TRÊN */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link
            to="/orders"
            className={`bg-white border rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer
              ${isActive("/orders") ? "border-amber-400" : "border-gray-200"}`}
          >
            <svg className={`w-10 h-10 ${isActive("/orders") ? "text-amber-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className={`text-sm font-medium ${isActive("/orders") ? "text-amber-500" : "text-gray-600"}`}>
              Lịch sử đơn hàng
            </span>
          </Link>

          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">
              Hi, <span className="text-amber-500 font-semibold">{user?.name || "Bạn"}</span>!
            </p>
          </div>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CỘT TRÁI: NỘI DUNG THAY ĐỔI */}
          <div className="lg:col-span-2">
            {children}
          </div>

          {/* CỘT PHẢI: MENU CỐ ĐỊNH */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <MenuItem to="/profile" active={isActive("/profile")} label="Thông tin cá nhân">
                <UserIcon />
              </MenuItem>
              <div className="border-t border-gray-100" />
              <MenuItem to="/address" active={isActive("/address")} label="Quản lý địa chỉ (1)">
                <AddressIcon />
              </MenuItem>
              <div className="border-t border-gray-100" />
              <MenuItem to="/orders" active={isActive("/orders") || isActive(`/orders/${location.pathname.split("/")[2]}`)} label="Lịch sử đơn hàng">
                <OrderIcon />
              </MenuItem>
              <div className="border-t border-gray-100" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogoutIcon />
                Đăng xuất
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ---- MENU ITEM ----
function MenuItem({ to, active, label, children }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-5 py-4 text-sm transition-colors
        ${active ? "text-amber-500 font-semibold bg-amber-50" : "text-gray-700 hover:bg-gray-50 hover:text-amber-500"}`}
    >
      {children}
      {label}
    </Link>
  );
}

// ---- ICONS ----
function UserIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function AddressIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function OrderIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}