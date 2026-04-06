// src/pages/admin/_mockProducts.js
// Xoá file này khi API sẵn sàng, thay bằng hooks/useProducts.js

export const mockCategories = [
  { id: 1, name: "Phòng khách" },
  { id: 2, name: "Phòng ngủ" },
  { id: 3, name: "Phòng ăn" },
  { id: 4, name: "Phòng làm việc" },
  { id: 5, name: "Phòng bếp" },
  { id: 6, name: "Ngoài trời" }
];

export const mockColors = [
  { id: 1, name: "Trắng", hex: "#FFFFFF" },
  { id: 2, name: "Đen", hex: "#1C1C1C" },
  { id: 3, name: "Nâu", hex: "#795548" },
  { id: 4, name: "Nâu đậm", hex: "#4E342E" },
  { id: 5, name: "Xám", hex: "#9E9E9E" },
  { id: 6, name: "Kem", hex: "#F5F0E8" },
  { id: 7, name: "Xanh navy", hex: "#1A237E" }
];

export const mockDimensions = [
  { id: 1, name: "Nhỏ (S)" },
  { id: 2, name: "Vừa (M)" },
  { id: 3, name: "Lớn (L)" },
  { id: 4, name: "Cỡ đơn" },
  { id: 5, name: "Cỡ đôi" },
  { id: 6, name: "King" }
];

export const mockProducts = [
  {
    id: 1,
    name: "Ghế sofa L Milan",
    categoryId: 1,
    categoryName: "Phòng khách",
    description: "Ghế sofa góc L thiết kế hiện đại, chất liệu vải cao cấp, khung gỗ sồi tự nhiên.",
    image: null,
    attributes: [
      {
        id: 1,
        colorId: 5,
        colorName: "Xám",
        colorHex: "#9E9E9E",
        dimensionsId: 3,
        dimensionsName: "Lớn (L)",
        name: "Sofa L Milan - Xám / Lớn",
        price: 12400000,
        stock: 23
      },
      {
        id: 2,
        colorId: 6,
        colorName: "Kem",
        colorHex: "#F5F0E8",
        dimensionsId: 3,
        dimensionsName: "Lớn (L)",
        name: "Sofa L Milan - Kem / Lớn",
        price: 12800000,
        stock: 11
      }
    ],
    createdAt: "2024-11-10",
    status: "active"
  },
  {
    id: 2,
    name: "Bàn ăn gỗ sồi 6 ghế",
    categoryId: 3,
    categoryName: "Phòng ăn",
    description: "Bộ bàn ăn 6 ghế gỗ sồi nguyên khối, mặt bàn rộng 180×90cm, hoàn thiện dầu tự nhiên.",
    image: null,
    attributes: [
      { id: 3, colorId: 3, colorName: "Nâu", colorHex: "#795548", dimensionsId: 3, dimensionsName: "Lớn (L)", name: "Bàn ăn sồi - Nâu / Lớn", price: 8200000, stock: 8 }
    ],
    createdAt: "2024-11-15",
    status: "active"
  },
  {
    id: 3,
    name: "Giường ngủ King 1m8",
    categoryId: 2,
    categoryName: "Phòng ngủ",
    description: "Giường ngủ cỡ King kích thước 200×180cm, đầu giường bọc da cao cấp, ngăn chứa đồ phía dưới.",
    image: null,
    attributes: [
      { id: 4, colorId: 1, colorName: "Trắng", colorHex: "#FFFFFF", dimensionsId: 6, dimensionsName: "King", name: "Giường King - Trắng", price: 22000000, stock: 0 },
      { id: 5, colorId: 2, colorName: "Đen", colorHex: "#1C1C1C", dimensionsId: 6, dimensionsName: "King", name: "Giường King - Đen", price: 22000000, stock: 5 }
    ],
    createdAt: "2024-12-01",
    status: "active"
  },
  {
    id: 4,
    name: "Kệ sách gỗ cao su",
    categoryId: 4,
    categoryName: "Phòng làm việc",
    description: "Kệ sách 5 tầng gỗ cao su bền chắc, thiết kế tối giản phù hợp mọi không gian.",
    image: null,
    attributes: [
      {
        id: 6,
        colorId: 4,
        colorName: "Nâu đậm",
        colorHex: "#4E342E",
        dimensionsId: 2,
        dimensionsName: "Vừa (M)",
        name: "Kệ sách - Nâu đậm / Vừa",
        price: 3900000,
        stock: 45
      },
      { id: 7, colorId: 1, colorName: "Trắng", colorHex: "#FFFFFF", dimensionsId: 2, dimensionsName: "Vừa (M)", name: "Kệ sách - Trắng / Vừa", price: 3900000, stock: 30 }
    ],
    createdAt: "2024-12-10",
    status: "active"
  },
  {
    id: 5,
    name: "Tủ quần áo 3 cánh",
    categoryId: 2,
    categoryName: "Phòng ngủ",
    description: "Tủ quần áo 3 cánh gương, thanh treo và ngăn kéo, kích thước 180×60×210cm.",
    image: null,
    attributes: [
      {
        id: 8,
        colorId: 1,
        colorName: "Trắng",
        colorHex: "#FFFFFF",
        dimensionsId: 3,
        dimensionsName: "Lớn (L)",
        name: "Tủ 3 cánh - Trắng / Lớn",
        price: 15700000,
        stock: 12
      }
    ],
    createdAt: "2025-01-05",
    status: "active"
  },
  {
    id: 6,
    name: "Ghế làm việc Ergo Pro",
    categoryId: 4,
    categoryName: "Phòng làm việc",
    description: "Ghế công thái học hỗ trợ lưng, tựa đầu, tay vịn 4D, lưới thoáng khí cao cấp.",
    image: null,
    attributes: [
      { id: 9, colorId: 2, colorName: "Đen", colorHex: "#1C1C1C", dimensionsId: 2, dimensionsName: "Vừa (M)", name: "Ergo Pro - Đen", price: 9500000, stock: 18 },
      { id: 10, colorId: 5, colorName: "Xám", colorHex: "#9E9E9E", dimensionsId: 2, dimensionsName: "Vừa (M)", name: "Ergo Pro - Xám", price: 9500000, stock: 7 }
    ],
    createdAt: "2025-01-20",
    status: "inactive"
  },
  {
    id: 7,
    name: "Bàn cà phê tròn Oak",
    categoryId: 1,
    categoryName: "Phòng khách",
    description: "Bàn trà tròn mặt gỗ sồi, chân kim loại sơn tĩnh điện, đường kính 80cm.",
    image: null,
    attributes: [
      { id: 11, colorId: 3, colorName: "Nâu", colorHex: "#795548", dimensionsId: 1, dimensionsName: "Nhỏ (S)", name: "Bàn trà Oak - Nâu / Nhỏ", price: 4200000, stock: 0 }
    ],
    createdAt: "2025-02-14",
    status: "active"
  }
];

export const productStats = {
  total: mockProducts.length,
  active: mockProducts.filter(p => p.status === "active").length,
  inactive: mockProducts.filter(p => p.status === "inactive").length,
  outOfStock: mockProducts.filter(p => p.attributes.every(a => a.stock === 0)).length,
  lowStock: mockProducts.filter(p => p.attributes.some(a => a.stock > 0 && a.stock <= 10) && !p.attributes.every(a => a.stock === 0)).length
};
