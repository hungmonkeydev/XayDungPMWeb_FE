import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import HomePage from "../pages/customer/HomePage";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Trang Admin thường có Header/Sidebar riêng nên không dùng CustomerLayout
  },
]);

export default router;