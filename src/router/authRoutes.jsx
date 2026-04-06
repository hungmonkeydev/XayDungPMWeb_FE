import { Suspense, lazy } from "react";

const LoginPage          = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage       = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));

const Loading = () => <div style={{ textAlign: "center", padding: 40 }}>Đang tải...</div>;

const authRoutes = [
  { path: "/login",           element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> },
  { path: "/register",        element: <Suspense fallback={<Loading />}><RegisterPage /></Suspense> },
  { path: "/forgot-password", element: <Suspense fallback={<Loading />}><ForgotPasswordPage /></Suspense> },
];

export default authRoutes;