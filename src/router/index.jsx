import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// ---- Layout ----
import AdminLayout from "../pages/admin/AdminLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ---- Customer pages (thành viên A) ----
import HomePage from "../pages/customer/HomePage";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import ProductFormPage from "../pages/admin/ProductFormPage";

// ---- Auth pages (bạn - thành viên B) ----
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
  // ---- Routes khách hàng (thành viên A) ----
  {
    path: "/",
    element: <CustomerLayout><HomePage /></CustomerLayout>,
  },

  // ---- Routes auth (thành viên B) ----
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

  // ---- Routes admin (thành viên C) ----
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

  // ---- 404 chung ----
  {
    path: "*",
    element: <div style={{ textAlign: "center", padding: 60 }}>404 - Không tìm thấy trang</div>,
  },
]);

export default router;