// src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>
  },
  {
    path: "/admin",
    element: <AdminLayout />
    // Nếu sau này muốn deep-link từng trang (ví dụ /admin/orders),
    // hãy chuyển sang dùng <Outlet /> và thêm children routes tại đây.
  }
]);

export default router;
