// src/pages/admin/_mockCustomers.js
// Xoá file này khi API sẵn sàng, thay bằng hooks/useCustomers.js

export const mockCustomers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    loginMethod: "google",
    isActive: true,
    createdAt: "2024-09-15T08:00:00",
    totalOrders: 8,
    totalSpent: 45200000,
    lastOrderAt: "2025-04-01T08:23:00"
  },
  {
    id: 2,
    name: "Trần Thị Bích",
    email: "tranthib@email.com",
    loginMethod: "email",
    isActive: true,
    createdAt: "2024-10-02T10:30:00",
    totalOrders: 3,
    totalSpent: 18600000,
    lastOrderAt: "2025-04-02T10:05:00"
  },
  {
    id: 3,
    name: "Lê Minh Châu",
    email: "leminc@gmail.com",
    loginMethod: "google",
    isActive: false,
    createdAt: "2024-10-20T14:00:00",
    totalOrders: 1,
    totalSpent: 15700000,
    lastOrderAt: "2025-04-03T14:30:00"
  },
  {
    id: 4,
    name: "Phạm Thanh Dung",
    email: "phamthanhdung@email.com",
    loginMethod: "email",
    isActive: true,
    createdAt: "2024-11-05T09:00:00",
    totalOrders: 5,
    totalSpent: 27300000,
    lastOrderAt: "2025-04-04T09:15:00"
  },
  {
    id: 5,
    name: "Hoàng Kim Ên",
    email: "hoangkimen@gmail.com",
    loginMethod: "google",
    isActive: true,
    createdAt: "2024-11-18T16:00:00",
    totalOrders: 2,
    totalSpent: 22000000,
    lastOrderAt: "2025-04-04T16:45:00"
  },
  {
    id: 6,
    name: "Vũ Thị Lan",
    email: "vuthilan@email.com",
    loginMethod: "email",
    isActive: true,
    createdAt: "2024-12-01T11:00:00",
    totalOrders: 6,
    totalSpent: 38900000,
    lastOrderAt: "2025-04-05T11:20:00"
  },
  {
    id: 7,
    name: "Đặng Văn Minh",
    email: "dangvanminh@gmail.com",
    loginMethod: "google",
    isActive: false,
    createdAt: "2024-12-10T08:30:00",
    totalOrders: 1,
    totalSpent: 8400000,
    lastOrderAt: "2025-04-06T08:00:00"
  },
  {
    id: 8,
    name: "Bùi Thị Ngọc",
    email: "buithingoc@email.com",
    loginMethod: "email",
    isActive: true,
    createdAt: "2025-01-03T13:00:00",
    totalOrders: 4,
    totalSpent: 31500000,
    lastOrderAt: "2025-03-28T13:00:00"
  },
  {
    id: 9,
    name: "Ngô Quốc Phú",
    email: "ngoquocphu@gmail.com",
    loginMethod: "google",
    isActive: true,
    createdAt: "2025-01-20T10:00:00",
    totalOrders: 2,
    totalSpent: 11800000,
    lastOrderAt: "2025-03-15T10:00:00"
  },
  {
    id: 10,
    name: "Đinh Thị Quỳnh",
    email: "dinhthiquynh@email.com",
    loginMethod: "email",
    isActive: true,
    createdAt: "2025-02-14T09:00:00",
    totalOrders: 0,
    totalSpent: 0,
    lastOrderAt: null
  }
];

// Lấy orders của 1 khách từ mockOrders (dùng trong detail page)
export const mockCustomerOrders = {
  1: [
    { id: 1, code: "#DH0091", totalPrice: 12400000, status: "completed", createdAt: "2025-04-01T08:23:00", productName: "Ghế sofa L Milan - Xám / Lớn" },
    { id: 8, code: "#DH0084", totalPrice: 8200000, status: "completed", createdAt: "2025-03-10T10:00:00", productName: "Bàn ăn gỗ sồi 6 ghế - Nâu / Lớn" }
  ],
  2: [{ id: 2, code: "#DH0090", totalPrice: 7700000, status: "shipping", createdAt: "2025-04-02T10:05:00", productName: "Bàn ăn gỗ sồi 6 ghế - Nâu / Lớn" }],
  3: [{ id: 3, code: "#DH0089", totalPrice: 14500000, status: "confirmed", createdAt: "2025-04-03T14:30:00", productName: "Tủ quần áo 3 cánh - Trắng / Lớn" }],
  4: [{ id: 4, code: "#DH0088", totalPrice: 3900000, status: "pending", createdAt: "2025-04-04T09:15:00", productName: "Kệ sách gỗ cao su - Nâu đậm / Vừa" }],
  5: [{ id: 5, code: "#DH0087", totalPrice: 22000000, status: "cancelled", createdAt: "2025-04-04T16:45:00", productName: "Giường ngủ King 1m8 - Trắng" }],
  6: [{ id: 6, code: "#DH0086", totalPrice: 7600000, status: "completed", createdAt: "2025-04-05T11:20:00", productName: "Ghế làm việc Ergo Pro - Đen / Vừa" }],
  7: [{ id: 7, code: "#DH0085", totalPrice: 8400000, status: "pending", createdAt: "2025-04-06T08:00:00", productName: "Bàn cà phê tròn Oak - Nâu / Nhỏ" }]
};

export const customerStats = {
  total: mockCustomers.length,
  active: mockCustomers.filter(c => c.isActive).length,
  inactive: mockCustomers.filter(c => !c.isActive).length,
  google: mockCustomers.filter(c => c.loginMethod === "google").length,
  newThisMonth: mockCustomers.filter(c => {
    const d = new Date(c.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length
};
