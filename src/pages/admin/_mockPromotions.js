// src/pages/admin/_mockPromotions.js
// Xoá file này khi API sẵn sàng, thay bằng hooks/usePromotions.js

export const mockPromotions = [
  {
    id: 1,
    code: "SALE20",
    name: "Giảm 20% phòng khách",
    description: "Áp dụng cho tất cả sản phẩm danh mục Phòng khách trong tháng 4.",
    type: "percentage",
    value: 20,
    startDay: "2025-04-01",
    endDay: "2025-04-30",
    isActive: true,
    usageCount: 47,
    categories: [{ id: 1, name: "Phòng khách" }]
  },
  {
    id: 2,
    code: "FIXED500",
    name: "Giảm 500K đơn từ 5M",
    description: "Giảm cố định 500,000₫ cho mỗi đơn hàng có giá trị từ 5,000,000₫ trở lên.",
    type: "fixed",
    value: 500000,
    startDay: "2025-04-15",
    endDay: "2025-05-15",
    isActive: true,
    usageCount: 23,
    categories: [
      { id: 1, name: "Phòng khách" },
      { id: 2, name: "Phòng ngủ" },
      { id: 3, name: "Phòng ăn" },
      { id: 4, name: "Phòng làm việc" },
      { id: 5, name: "Phòng bếp" },
      { id: 6, name: "Ngoài trời" }
    ]
  },
  {
    id: 3,
    code: "BED30",
    name: "Flash sale phòng ngủ",
    description: "Giảm 30% toàn bộ sản phẩm phòng ngủ, áp dụng trong 1 tuần.",
    type: "percentage",
    value: 30,
    startDay: "2025-04-01",
    endDay: "2025-04-08",
    isActive: true,
    usageCount: 18,
    categories: [{ id: 2, name: "Phòng ngủ" }]
  },
  {
    id: 4,
    code: "TET2025",
    name: "Khuyến mãi Tết Ất Tỵ",
    description: "Giảm 15% toàn bộ sản phẩm nhân dịp Tết Nguyên Đán 2025.",
    type: "percentage",
    value: 15,
    startDay: "2025-01-20",
    endDay: "2025-02-10",
    isActive: false,
    usageCount: 134,
    categories: [
      { id: 1, name: "Phòng khách" },
      { id: 2, name: "Phòng ngủ" },
      { id: 3, name: "Phòng ăn" },
      { id: 4, name: "Phòng làm việc" },
      { id: 5, name: "Phòng bếp" },
      { id: 6, name: "Ngoài trời" }
    ]
  },
  {
    id: 5,
    code: "WORK10",
    name: "Ưu đãi phòng làm việc",
    description: "Giảm 10% cho tất cả sản phẩm phòng làm việc và nội thất văn phòng.",
    type: "percentage",
    value: 10,
    startDay: "2025-03-01",
    endDay: "2025-03-31",
    isActive: false,
    usageCount: 61,
    categories: [{ id: 4, name: "Phòng làm việc" }]
  },
  {
    id: 6,
    code: "SUMMER25",
    name: "Sale hè 2025",
    description: "Ưu đãi mùa hè, giảm 25% danh mục ngoài trời và phòng khách.",
    type: "percentage",
    value: 25,
    startDay: "2025-06-01",
    endDay: "2025-08-31",
    isActive: true,
    usageCount: 0,
    categories: [
      { id: 1, name: "Phòng khách" },
      { id: 6, name: "Ngoài trời" }
    ]
  },
  {
    id: 7,
    code: "NEWMEMBER",
    name: "Ưu đãi thành viên mới",
    description: "Giảm cố định 200,000₫ cho đơn hàng đầu tiên của khách hàng mới.",
    type: "fixed",
    value: 200000,
    startDay: "2025-01-01",
    endDay: "2025-12-31",
    isActive: false,
    usageCount: 89,
    categories: [
      { id: 1, name: "Phòng khách" },
      { id: 2, name: "Phòng ngủ" },
      { id: 3, name: "Phòng ăn" },
      { id: 4, name: "Phòng làm việc" },
      { id: 5, name: "Phòng bếp" },
      { id: 6, name: "Ngoài trời" }
    ]
  }
];

// Tính trạng thái thực tế dựa theo ngày
export function getPromotionStatus(promotion) {
  const now = new Date();
  const start = new Date(promotion.startDay);
  const end = new Date(promotion.endDay);
  end.setHours(23, 59, 59);

  if (!promotion.isActive) return "inactive";
  if (now < start) return "upcoming";

  // Sắp hết hạn = còn ≤ 3 ngày
  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  if (now <= end && diffDays <= 3) return "expiring";
  if (now <= end) return "active";
  return "expired";
}

export const PROMO_STATUS_CFG = {
  active: { label: "Đang chạy", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  expiring: { label: "Sắp hết hạn", cls: "bg-amber-50   text-amber-700", dot: "bg-amber-400" },
  upcoming: { label: "Sắp diễn ra", cls: "bg-blue-50    text-blue-700", dot: "bg-blue-400" },
  expired: { label: "Hết hạn", cls: "bg-stone-100  text-stone-500", dot: "bg-stone-400" },
  inactive: { label: "Tắt", cls: "bg-stone-100  text-stone-400", dot: "bg-stone-300" }
};

export const promotionStats = (() => {
  const statuses = mockPromotions.map(getPromotionStatus);
  return {
    total: mockPromotions.length,
    active: statuses.filter(s => s === "active").length,
    expiring: statuses.filter(s => s === "expiring").length,
    upcoming: statuses.filter(s => s === "upcoming").length,
    expired: statuses.filter(s => s === "expired" || s === "inactive").length,
    totalUsage: mockPromotions.reduce((s, p) => s + p.usageCount, 0)
  };
})();
