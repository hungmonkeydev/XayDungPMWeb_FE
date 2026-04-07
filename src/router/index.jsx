import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import HomePage from "../pages/customer/HomePage";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import ProductFormPage from "../pages/admin/ProductFormPage";
import OrdersPage from "../pages/admin/OrdersPage";
import OrderDetailPage from "../pages/admin/OrderDetailPage";

// Tạo một Layout chung cho phía khách hàng (Customer)
const CustomerLayout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CustomerLayout>
        <HomePage />
      </CustomerLayout>
    )
  },
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
      // { path: "customers", element: <CustomersPage /> },
      // { path: "promotions", element: <PromotionsPage /> },
      // { path: "staff", element: <StaffPage /> },
      { path: "*", element: <div>404 Admin</div> }
    ]
  }
]);

export default router;
