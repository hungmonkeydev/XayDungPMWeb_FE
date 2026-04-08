/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// ---- Layout ----
import AdminLayout from "../pages/admin/AdminLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ---- Customer pages ----
import HomePage from "../pages/customer/HomePage";
import ProductDetailPage from "../components/product/ProductDetailPage";
import CartPage from "../components/cart/CartPage";

// ---- Admin pages ----
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import ProductFormPage from "../pages/admin/ProductFormPage";

// ---- Auth pages (Logic của bạn) ----
const LoginPage          = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage       = lazy(() => import("../pages/auth/RegisterPage"));
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

const router = createBrowserRouter([
  // --- GIAO DIỆN KHÁCH HÀNG ---
  {
    path: "/",
    element: <CustomerLayout><HomePage /></CustomerLayout>,
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
    path: "/san-pham/:id",
    element: (
      <CustomerLayout>
        <ProductDetailPage />
      </CustomerLayout>
    ),
  },

  // ---- ROUTES AUTH (Của bạn) ----
  {
    path: "/login",
    element: <Suspense fallback={<Loading />}><LoginPage /></Suspense>,
  },
  {
    path: "/register",
    element: <Suspense fallback={<Loading />}><RegisterPage /></Suspense>,
  },
  {
    path: "/forgot-password",
    element: <Suspense fallback={<Loading />}><ForgotPasswordPage /></Suspense>,
  },

  // --- GIAO DIỆN ADMIN ---
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard",           element: <DashboardPage /> },
      { path: "products",            element: <ProductsPage /> },
      { path: "products/create",     element: <ProductFormPage /> },
      { path: "products/edit/:id",   element: <ProductFormPage /> },
      { path: "*",                   element: <div>404 Admin</div> },
    ],
  },

  // ---- 404 CHUNG ----
  {
    path: "*",
    element: <div style={{ textAlign: "center", padding: 60 }}>404 - Không tìm thấy trang</div>,
  },
]);

export default router;