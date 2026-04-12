import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import HomePage from "../pages/customer/HomePage";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
<<<<<<< Updated upstream
import ProductDetailPage from "../components/product/ProductDetailPage";
import CartPage from "../components/cart/CartPage";

// ADMIN
=======

// ---- Customer pages ----
import HomePage from "../pages/customer/HomePage";
import ProductDetailPage from "../pages/customer/ProductDetailPage";
import CartPage from "../components/cart/CartPage";
import ProductListPage from '../pages/customer/ProductListPage';
// ---- Admin pages ----
>>>>>>> Stashed changes
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import ProductFormPage from "../pages/admin/ProductFormPage";

// Tạo một Layout chung cho phía khách hàng (Customer)
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
      // 2. BỌC LAYOUT VÀO ĐÂY ĐỂ GIỮ LẠI HEADER & FOOTER 👇
      <CustomerLayout>
        <ProductDetailPage />
      </CustomerLayout>
    ),
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
      // { path: "orders", element: <OrdersPage /> },
      // { path: "customers", element: <CustomersPage /> },
      // { path: "promotions", element: <PromotionsPage /> },
      // { path: "staff", element: <StaffPage /> },
      { path: "*", element: <div>404 Admin</div> }
    ]
  }
]);

export default router;