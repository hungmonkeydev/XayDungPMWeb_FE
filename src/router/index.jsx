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
import CartPage from "../pages/customer/CartPage";

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

// ---- Auth pages ----
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));

const Loading = () => <div style={{ textAlign: "center", padding: 40 }}>Đang tải...</div>;

// ---- Layout khách hàng ----
const CustomerLayout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

// ==== BƯỚC QUAN TRỌNG: TẠO ROOT LAYOUT CHỨA SCROLL ====
const RootLayout = () => {
  return (
    <>
      {/* Tính năng tự động cuộn lên đầu của React Router v6 */}
      <ScrollRestoration />
      
      {/* Outlet là nơi render các route con bên dưới */}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    // Bọc toàn bộ ứng dụng bằng RootLayout này
    element: <RootLayout />,
    children: [
      // --- GIAO DIỆN KHÁCH HÀNG ---
      {
        path: "/",
        element: (
          <CustomerLayout>
            <HomePage />
          </CustomerLayout>
        )
      },
      {
        path: "/gio-hang",
        element: (
          <CustomerLayout>
            <CartPage />
          </CustomerLayout>
        )
      },
      {
        path: "/products",
        element: (<CustomerLayout><ProductListPage /></CustomerLayout>)
      },
      {
        path: "/san-pham/:id",
        element: (
          <CustomerLayout>
            <ProductDetailPage />
          </CustomerLayout>
        )
      },

      // ---- ROUTES AUTH ----
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        )
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loading />}>
            <RegisterPage />
          </Suspense>
        )
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<Loading />}>
            <ForgotPasswordPage />
          </Suspense>
        )
      },

      // --- GIAO DIỆN ADMIN ---
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
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