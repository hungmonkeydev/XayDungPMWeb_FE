// src/pages/admin/_mockStaff.js
// Xoá file này khi API sẵn sàng, thay bằng hooks/useStaff.js

export const mockStaff = [
  {
    id: 1,
    name: "Nguyễn Thị Admin",
    email: "admin@noithat.vn",
    type: "Admin",
    isActive: true,
    loginMethod: "email",
    createdAt: "2024-01-10T08:00:00",
    lastLoginAt: "2025-04-08T07:45:00"
  },
  {
    id: 2,
    name: "Trần Minh Nguyệt",
    email: "minhnguyet@noithat.vn",
    type: "Admin",
    isActive: true,
    loginMethod: "google",
    createdAt: "2024-03-15T09:00:00",
    lastLoginAt: "2025-04-07T14:22:00"
  },
  {
    id: 3,
    name: "Lê Bảo Linh",
    email: "baolinh@noithat.vn",
    type: "Admin",
    isActive: true,
    loginMethod: "google",
    createdAt: "2024-05-20T10:00:00",
    lastLoginAt: "2025-04-06T09:10:00"
  },
  {
    id: 4,
    name: "Phạm Hoàng Tuấn",
    email: "hoangtuan@noithat.vn",
    type: "Staff",
    isActive: false,
    loginMethod: "email",
    createdAt: "2024-06-01T08:30:00",
    lastLoginAt: "2025-03-20T16:00:00"
  },
  {
    id: 5,
    name: "Vũ Thanh Hà",
    email: "thanhha@noithat.vn",
    type: "Staff",
    isActive: true,
    loginMethod: "email",
    createdAt: "2024-07-10T09:00:00",
    lastLoginAt: "2025-04-08T08:30:00"
  },
  {
    id: 6,
    name: "Đặng Quốc Bảo",
    email: "quocbao@noithat.vn",
    type: "Staff",
    isActive: true,
    loginMethod: "google",
    createdAt: "2024-08-05T10:00:00",
    lastLoginAt: "2025-04-07T17:45:00"
  },
  {
    id: 7,
    name: "Bùi Kim Oanh",
    email: "kimoanh@noithat.vn",
    type: "Staff",
    isActive: true,
    loginMethod: "email",
    createdAt: "2024-09-12T08:00:00",
    lastLoginAt: "2025-04-05T11:00:00"
  },
  {
    id: 8,
    name: "Ngô Minh Khoa",
    email: "minhkhoa@noithat.vn",
    type: "Staff",
    isActive: true,
    loginMethod: "email",
    createdAt: "2024-10-01T09:30:00",
    lastLoginAt: "2025-04-08T09:15:00"
  },
  {
    id: 9,
    name: "Đinh Thị Lan Anh",
    email: "lananh@noithat.vn",
    type: "Staff",
    isActive: false,
    loginMethod: "google",
    createdAt: "2024-11-15T10:00:00",
    lastLoginAt: "2025-03-28T14:30:00"
  },
  {
    id: 10,
    name: "Hoàng Đức Việt",
    email: "ducviet@noithat.vn",
    type: "Staff",
    isActive: true,
    loginMethod: "email",
    createdAt: "2025-01-06T08:00:00",
    lastLoginAt: "2025-04-07T10:00:00"
  }
];

export const staffStats = {
  total: mockStaff.length,
  admin: mockStaff.filter(s => s.type === "Admin").length,
  staff: mockStaff.filter(s => s.type === "Staff").length,
  active: mockStaff.filter(s => s.isActive).length,
  inactive: mockStaff.filter(s => !s.isActive).length,
  google: mockStaff.filter(s => s.loginMethod === "google").length
};
