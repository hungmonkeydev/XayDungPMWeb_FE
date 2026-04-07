// src/pages/admin/_mockOrders.js
// Xoá file này khi API sẵn sàng, thay bằng hooks/useOrders.js

export const mockOrders = [
  {
    id: 1,
    code: "#DH0091",
    customerId: 1,
    customerName: "Nguyễn Văn An",
    customerPhone: "0901234567",
    customerAddress: "12 Lê Lợi, Phường Bến Nghé, Quận 1, TP. HCM",
    promotionId: null,
    promotionCode: null,
    method: "VNPay",
    subtotal: 12400000,
    discountAmount: 0,
    totalPrice: 12400000,
    status: "completed",
    note: "",
    createdAt: "2025-04-01T08:23:00",
    details: [
      {
        id: 1,
        productAttributeId: 1,
        productName: "Ghế sofa L Milan - Xám / Lớn",
        productImage: null,
        quantity: 1,
        unitPrice: 12400000,
        total: 12400000
      }
    ],
    payment: { method: "VNPay", transactionId: "VNP20250401082300", amount: 12400000, status: "success" }
  },
  {
    id: 2,
    code: "#DH0090",
    customerId: 2,
    customerName: "Trần Thị Bích",
    customerPhone: "0912345678",
    customerAddress: "45 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP. HCM",
    promotionId: 1,
    promotionCode: "SALE20",
    method: "COD",
    subtotal: 8200000,
    discountAmount: 500000,
    totalPrice: 7700000,
    status: "shipping",
    note: "Giao buổi sáng trước 10h",
    createdAt: "2025-04-02T10:05:00",
    details: [
      {
        id: 2,
        productAttributeId: 3,
        productName: "Bàn ăn gỗ sồi 6 ghế - Nâu / Lớn",
        productImage: null,
        quantity: 1,
        unitPrice: 8200000,
        total: 8200000
      }
    ],
    payment: { method: "COD", transactionId: "COD20250402", amount: 7700000, status: "pending" }
  },
  {
    id: 3,
    code: "#DH0089",
    customerId: 3,
    customerName: "Lê Minh Châu",
    customerPhone: "0923456789",
    customerAddress: "88 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM",
    promotionId: 2,
    promotionCode: "FIXED500",
    method: "VNPay",
    subtotal: 15700000,
    discountAmount: 1200000,
    totalPrice: 14500000,
    status: "confirmed",
    note: "",
    createdAt: "2025-04-03T14:30:00",
    details: [
      {
        id: 3,
        productAttributeId: 8,
        productName: "Tủ quần áo 3 cánh - Trắng / Lớn",
        productImage: null,
        quantity: 1,
        unitPrice: 15700000,
        total: 15700000
      }
    ],
    payment: { method: "VNPay", transactionId: "VNP20250403143000", amount: 14500000, status: "success" }
  },
  {
    id: 4,
    code: "#DH0088",
    customerId: 4,
    customerName: "Phạm Thanh Dung",
    customerPhone: "0934567890",
    customerAddress: "20 Lý Tự Trọng, Phường Bến Nghé, Quận 1, TP. HCM",
    promotionId: null,
    promotionCode: null,
    method: "COD",
    subtotal: 3900000,
    discountAmount: 0,
    totalPrice: 3900000,
    status: "pending",
    note: "Gọi trước khi giao 30 phút",
    createdAt: "2025-04-04T09:15:00",
    details: [
      {
        id: 4,
        productAttributeId: 6,
        productName: "Kệ sách gỗ cao su - Nâu đậm / Vừa",
        productImage: null,
        quantity: 2,
        unitPrice: 1950000,
        total: 3900000
      }
    ],
    payment: { method: "COD", transactionId: "COD20250404", amount: 3900000, status: "pending" }
  },
  {
    id: 5,
    code: "#DH0087",
    customerId: 5,
    customerName: "Hoàng Kim Ên",
    customerPhone: "0945678901",
    customerAddress: "33 Pasteur, Phường Nguyễn Thái Bình, Quận 1, TP. HCM",
    promotionId: null,
    promotionCode: null,
    method: "VNPay",
    subtotal: 22000000,
    discountAmount: 0,
    totalPrice: 22000000,
    status: "cancelled",
    note: "Khách huỷ do đổi ý",
    createdAt: "2025-04-04T16:45:00",
    details: [
      {
        id: 5,
        productAttributeId: 4,
        productName: "Giường ngủ King 1m8 - Trắng",
        productImage: null,
        quantity: 1,
        unitPrice: 22000000,
        total: 22000000
      }
    ],
    payment: { method: "VNPay", transactionId: "VNP20250404164500", amount: 22000000, status: "failed" }
  },
  {
    id: 6,
    code: "#DH0086",
    customerId: 6,
    customerName: "Vũ Thị Lan",
    customerPhone: "0956789012",
    customerAddress: "77 Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP. HCM",
    promotionId: 1,
    promotionCode: "SALE20",
    method: "VNPay",
    subtotal: 9500000,
    discountAmount: 1900000,
    totalPrice: 7600000,
    status: "completed",
    note: "",
    createdAt: "2025-04-05T11:20:00",
    details: [
      {
        id: 6,
        productAttributeId: 9,
        productName: "Ghế làm việc Ergo Pro - Đen / Vừa",
        productImage: null,
        quantity: 1,
        unitPrice: 9500000,
        total: 9500000
      }
    ],
    payment: { method: "VNPay", transactionId: "VNP20250405112000", amount: 7600000, status: "success" }
  },
  {
    id: 7,
    code: "#DH0085",
    customerId: 7,
    customerName: "Đặng Văn Minh",
    customerPhone: "0967890123",
    customerAddress: "5 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. HCM",
    promotionId: null,
    promotionCode: null,
    method: "COD",
    subtotal: 8400000,
    discountAmount: 0,
    totalPrice: 8400000,
    status: "pending",
    note: "",
    createdAt: "2025-04-06T08:00:00",
    details: [
      {
        id: 7,
        productAttributeId: 11,
        productName: "Bàn cà phê tròn Oak - Nâu / Nhỏ",
        productImage: null,
        quantity: 2,
        unitPrice: 4200000,
        total: 8400000
      }
    ],
    payment: { method: "COD", transactionId: "COD20250406", amount: 8400000, status: "pending" }
  }
];

export const orderStats = {
  total: mockOrders.length,
  pending: mockOrders.filter(o => o.status === "pending").length,
  confirmed: mockOrders.filter(o => o.status === "confirmed").length,
  shipping: mockOrders.filter(o => o.status === "shipping").length,
  completed: mockOrders.filter(o => o.status === "completed").length,
  cancelled: mockOrders.filter(o => o.status === "cancelled").length,
  revenue: mockOrders.filter(o => o.status === "completed").reduce((s, o) => s + o.totalPrice, 0)
};

// Thứ tự chuyển trạng thái hợp lệ
export const STATUS_FLOW = {
  pending: "confirmed",
  confirmed: "shipping",
  shipping: "completed",
  completed: null,
  cancelled: null
};

export const STATUS_CFG = {
  pending: { label: "Chờ xử lý", cls: "bg-amber-50  text-amber-700", dot: "bg-amber-400" },
  confirmed: { label: "Xác nhận", cls: "bg-violet-50 text-violet-700", dot: "bg-violet-400" },
  shipping: { label: "Đang giao", cls: "bg-blue-50   text-blue-700", dot: "bg-blue-400" },
  completed: { label: "Hoàn tất", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  cancelled: { label: "Đã huỷ", cls: "bg-rose-50   text-rose-700", dot: "bg-rose-400" }
};

export const PAYMENT_STATUS_CFG = {
  pending: { label: "Chờ thanh toán", cls: "bg-amber-50 text-amber-700" },
  success: { label: "Đã thanh toán", cls: "bg-emerald-50 text-emerald-700" },
  failed: { label: "Thất bại", cls: "bg-rose-50 text-rose-700" }
};
