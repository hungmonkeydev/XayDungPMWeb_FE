import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
// import customerRoutes from "./customerRoutes"; // thành viên A thêm vào
// import accountRoutes  from "./accountRoutes";  // bạn thêm sau
// import adminRoutes    from "./adminRoutes";     // thành viên C thêm vào

const router = createBrowserRouter([
  ...authRoutes,
  // ...customerRoutes,
  // ...accountRoutes,
  // ...adminRoutes,
]);

export default router;