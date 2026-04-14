/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// ---- Layout ----
import AdminLayout from "../pages/admin/AdminLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ---- Customer pages ----
import HomePage from "../pages/customer/HomePage";
import ProductListPage from '../pages/customer/ProductListPage';
import ProductDetailPage from "../pages/customer/ProductDetailPage";
import CartPage from "../components/cart/CartPage";

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

// ---- Auth pages (B) ----
const LoginPage          = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage       = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));

// ---- Account pages (B) ----
const ProfilePage            = lazy(() => import("../pages/account/ProfilePage"));
const AddressPage            = lazy(() => import("../pages/account/AddressPage"));
const OrderHistoryPage       = lazy(() => import("../pages/account/OrderHistoryPage"));
const OrderDetailPageAccount = lazy(() => import("../pages/account/OrderDetailPage"));

// ---- Checkout pages (B) ----
const CheckoutPage     = lazy(() => import("../pages/checkout/CheckoutPage"));
const PaymentPage      = lazy(() => import("../pages/checkout/PaymentPage"));
const OrderSuccessPage = lazy(() => import("../pages/checkout/OrderSuccessPage"));

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
    element: <CustomerLayout><CartPage /></CustomerLayout>,
  },
  {
    path: "/products",
    element: <CustomerLayout><ProductListPage /></CustomerLayout>,
  },
  {
    path: "/san-pham/:id",
    element: <CustomerLayout><ProductDetailPage /></CustomerLayout>,
  },

  // ---- ROUTES AUTH (B) ----
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

  // ---- ROUTES ACCOUNT (B) ----
  {
    path: "/profile",
    element: <Suspense fallback={<Loading />}><CustomerLayout><ProfilePage /></CustomerLayout></Suspense>,
  },
  {
    path: "/address",
    element: <Suspense fallback={<Loading />}><CustomerLayout><AddressPage /></CustomerLayout></Suspense>,
  },
  {
    path: "/orders",
    element: <Suspense fallback={<Loading />}><CustomerLayout><OrderHistoryPage /></CustomerLayout></Suspense>,
  },
  {
    path: "/orders/:id",
    element: <Suspense fallback={<Loading />}><CustomerLayout><OrderDetailPageAccount /></CustomerLayout></Suspense>,
  },

  // ---- ROUTES CHECKOUT (B) ----
  {
    path: "/checkout",
    element: <Suspense fallback={<Loading />}><CustomerLayout><CheckoutPage /></CustomerLayout></Suspense>,
  },
  {
    path: "/payment",
    element: <Suspense fallback={<Loading />}><CustomerLayout><PaymentPage /></CustomerLayout></Suspense>,
  },
  {
    path: "/order-success",
    element: <Suspense fallback={<Loading />}><CustomerLayout><OrderSuccessPage /></CustomerLayout></Suspense>,
  },

  // --- GIAO DIỆN ADMIN ---
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard",            element: <DashboardPage /> },
      { path: "products",             element: <ProductsPage /> },
      { path: "products/create",      element: <ProductFormPage /> },
      { path: "products/edit/:id",    element: <ProductFormPage /> },
      { path: "orders",               element: <OrdersPage /> },
      { path: "orders/:id",           element: <OrderDetailPage /> },
      { path: "customers",            element: <CustomersPage /> },
      { path: "customers/detail/:id", element: <CustomerDetailPage /> },
      { path: "promotions",           element: <PromotionsPage /> },
      { path: "staff",                element: <StaffPage /> },
      { path: "*",                    element: <div>404 Admin</div> },
    ],
  },

  // ---- 404 CHUNG ----
  {
    path: "*",
    element: <div style={{ textAlign: "center", padding: 60 }}>404 - Không tìm thấy trang</div>,
  },
]);

export default router;