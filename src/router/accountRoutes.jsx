import { Suspense, lazy } from "react";

const ProfilePage      = lazy(() => import("../pages/account/ProfilePage"));
const AddressPage      = lazy(() => import("../pages/account/AddressPage"));
const OrderHistoryPage = lazy(() => import("../pages/account/OrderHistoryPage"));
const OrderDetailPage  = lazy(() => import("../pages/account/OrderDetailPage"));
const CheckoutPage     = lazy(() => import("../pages/checkout/CheckoutPage"));
const PaymentPage      = lazy(() => import("../pages/checkout/PaymentPage"));
const OrderSuccessPage = lazy(() => import("../pages/checkout/OrderSuccessPage"));

const Loading = () => <div style={{ textAlign: "center", padding: 40 }}>Đang tải...</div>;

const accountRoutes = [
  { path: "/profile",       element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense> },
  { path: "/address",       element: <Suspense fallback={<Loading />}><AddressPage /></Suspense> },
  { path: "/orders",        element: <Suspense fallback={<Loading />}><OrderHistoryPage /></Suspense> },
  { path: "/orders/:id",    element: <Suspense fallback={<Loading />}><OrderDetailPage /></Suspense> },
  { path: "/checkout",      element: <Suspense fallback={<Loading />}><CheckoutPage /></Suspense> },
  { path: "/payment",       element: <Suspense fallback={<Loading />}><PaymentPage /></Suspense> },
  { path: "/order-success", element: <Suspense fallback={<Loading />}><OrderSuccessPage /></Suspense> },
];

export default accountRoutes;