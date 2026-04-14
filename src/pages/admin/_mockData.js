// src/pages/admin/_mockData.js

export const dashboardStats = [
  {
    id: 1,
    label: "Doanh thu tháng này",
    value: "₫128.4M",
    icon: "revenue"
  },
  {
    id: 2,
    label: "Đơn hàng mới",
    value: "347",
    icon: "orders"
  },
  {
    id: 3,
    label: "Khách hàng",
    value: "89",
    icon: "customers"
  }
];

export const revenueChart = [
  { day: "T2", value: 42 },
  { day: "T3", value: 58 },
  { day: "T4", value: 35 },
  { day: "T5", value: 71 },
  { day: "T6", value: 63 },
  { day: "T7", value: 89 },
  { day: "CN", value: 76 }
];

export const orderStatusData = [
  { label: "Hoàn tất", value: 52, color: "#16a34a" },
  { label: "Đang giao", value: 28, color: "#2563eb" },
  { label: "Chờ xử lý", value: 13, color: "#d97706" },
  { label: "Đã hủy", value: 7, color: "#dc2626" }
];

export const recentOrders = [
  { id: "#DH0091", customer: "Nguyễn Văn A", product: "Ghế sofa L Milan", total: "₫12,400,000", method: "VNPay", status: "completed" },
  { id: "#DH0090", customer: "Trần Thị B", product: "Bàn ăn gỗ sồi 6 ghế", total: "₫8,200,000", method: "COD", status: "shipping" },
  { id: "#DH0089", customer: "Lê Minh C", product: "Tủ quần áo 3 cánh", total: "₫15,700,000", method: "VNPay", status: "confirmed" },
  { id: "#DH0088", customer: "Phạm Thanh D", product: "Kệ sách gỗ cao su", total: "₫3,900,000", method: "COD", status: "pending" },
  { id: "#DH0088", customer: "Phạm Thanh D", product: "Kệ sách gỗ cao su", total: "₫3,900,000", method: "COD", status: "pending" },
  { id: "#DH0087", customer: "Hoàng Kim E", product: "Giường ngủ King 1m8", total: "₫22,000,000", method: "VNPay", status: "cancelled" }
];

export const topProducts = [
  { name: "Ghế sofa L Milan", category: "Phòng khách", sold: 84, revenue: "₫1.04B" },
  { name: "Bàn ăn gỗ sồi 6 ghế", category: "Phòng ăn", sold: 67, revenue: "₫549.4M" },
  { name: "Giường ngủ King 1m8", category: "Phòng ngủ", sold: 51, revenue: "₫1.12B" },
  { name: "Tủ quần áo 3 cánh", category: "Phòng ngủ", sold: 43, revenue: "₫675.1M" },
  { name: "Tủ quần áo 3 cánh", category: "Phòng ngủ", sold: 43, revenue: "₫675.1M" },
  { name: "Tủ quần áo 3 cánh", category: "Phòng ngủ", sold: 43, revenue: "₫675.1M" },
  { name: "Tủ quần áo 3 cánh", category: "Phòng ngủ", sold: 43, revenue: "₫675.1M" },
  { name: "Tủ quần áo 3 cánh", category: "Phòng ngủ", sold: 43, revenue: "₫675.1M" },
  { name: "Tủ quần áo 3 cánh", category: "Phòng ngủ", sold: 43, revenue: "₫675.1M" },
  { name: "Kệ sách gỗ cao su", category: "Làm việc", sold: 98, revenue: "₫382.2M" }
];

export const adminNavItems = [
  {
    section: "Tổng quan",
    items: [{ id: "dashboard", label: "Dashboard", icon: "grid", path: "/admin/dashboard" }]
  },
  {
    section: "Catalogue",
    items: [{ id: "products", label: "Sản phẩm", icon: "box", path: "/admin/products" }]
  },
  {
    section: "Giao dịch",
    items: [
      { id: "orders", label: "Đơn hàng", icon: "cart", path: "/admin/orders" },
      { id: "customers", label: "Khách hàng", icon: "users", path: "/admin/customers" }
    ]
  },
  {
    section: "Marketing",
    items: [{ id: "promotions", label: "Khuyến mãi", icon: "tag", path: "/admin/promotions" }]
  },
  {
    section: "Hệ thống",
    items: [{ id: "staff", label: "Nhân viên", icon: "shield", path: "/admin/staff" }]
  }
];
