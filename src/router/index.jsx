/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { Suspense, lazy } from "react";

// ---- Layout ----
import AdminLayout from "../pages/admin/AdminLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ---- Customer pages ----
import HomePage from "../pages/customer/HomePage";
import ProductListPage from '../pages/customer/ProductListPage';
import ProductDetailPage from "../pages/customer/ProductDetailPage";
import CartPage from "../pages/customer/CartPage"; // Đã giữ 1 import đúng, xóa import trùng

// ---- Admin pages ----
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import ProductFormPage from "../pages/admin/ProductFormPage";
import OrdersPage from "../pages/admin/OrdersPage";
import OrderDetailPage from "../pages/admin/OrderDetailPage";
import CustomersPage from "../pages/admin/CustomersPage";
import CustomerDetailPage from "../pages/admin/CustomerDetailPage";
import PromotionsPage from "../pages/admin/PromotionsPage";
import StaffPage from "../pages/admin/StaffPage";

// ---- Lazy load pages (Auth, Account, Checkout) ----
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));

const ProfilePage = lazy(() => import("../pages/account/ProfilePage"));
const AddressPage = lazy(() => import("../pages/account/AddressPage"));
const OrderHistoryPage = lazy(() => import("../pages/account/OrderHistoryPage"));
const OrderDetailPageAccount = lazy(() => import("../pages/account/OrderDetailPage"));

const CheckoutPage = lazy(() => import("../pages/checkout/CheckoutPage"));
const PaymentPage = lazy(() => import("../pages/checkout/PaymentPage"));
const OrderSuccessPage = lazy(() => import("../pages/checkout/OrderSuccessPage"));

const Loading = () => <div style={{ textAlign: "center", padding: 40 }}>Đang tải...</div>;

// ---- Layout khách hàng (Dùng Outlet chuẩn React Router v6) ----
const CustomerLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

// ==== ROOT LAYOUT CHỨA SCROLL VÀ SUSPENSE ====
const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      {/* Bọc Suspense ở đây để áp dụng cho mọi trang Lazy load */}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

const router = createBrowserRouter([
  {
    // Bọc toàn bộ ứng dụng bằng RootLayout này
    element: <RootLayout />,
    children: [
      // --- NHÓM GIAO DIỆN KHÁCH HÀNG (Có Header & Footer) ---
      {
        element: <CustomerLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/gio-hang", element: <CartPage /> },
          { path: "/products", element: <ProductListPage /> },
          { path: "/san-pham/:id", element: <ProductDetailPage /> },

          // -- Account --
          { path: "/profile", element: <ProfilePage /> },
          { path: "/address", element: <AddressPage /> },
          { path: "/orders", element: <OrderHistoryPage /> },
          { path: "/orders/:id", element: <OrderDetailPageAccount /> },

          // -- Checkout --
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/payment", element: <PaymentPage /> },
          { path: "/order-success", element: <OrderSuccessPage /> },
        ]
      },

      // --- NHÓM ROUTES AUTH (Không có Header & Footer) ---
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },

      // --- NHÓM GIAO DIỆN ADMIN ---
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "products/create", element: <ProductFormPage /> },
          { path: "products/edit/:id", element: <ProductFormPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/:id", element: <OrderDetailPage /> },
          { path: "customers", element: <CustomersPage /> },
          { path: "customers/detail/:id", element: <CustomerDetailPage /> },
          { path: "promotions", element: <PromotionsPage /> },
          { path: "staff", element: <StaffPage /> },
          { path: "*", element: <div>404 Admin</div> }
        ]
      },

      // ---- 404 CHUNG ----
      {
        path: "*",
        element: <div style={{ textAlign: "center", padding: 60 }}>404 - Không tìm thấy trang</div>
      }
    ]
  }
]);

export default router;