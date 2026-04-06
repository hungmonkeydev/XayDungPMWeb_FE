import React, { useState, useEffect } from 'react';

const Header = () => {
  const announcements = [
    "Miễn phí lắp đặt nội thành các đơn hàng",
    "Mua ngay nhận quà ưu đãi, đừng bỏ lỡ!",
    "Bảo hành lên đến 5 năm cho các dòng Sofa cao cấp"
  ];

  // 2. STATE ĐIỀU KHIỂN:
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0); // Nhớ vị trí câu đang hiện
  const [isFading, setIsFading] = useState(false);           // Nhớ trạng thái (Đang mờ hay Rõ)

  // 3. HIỆU ỨNG TỰ ĐỘNG CHẠY (Timer)
  useEffect(() => {
    const timer = setInterval(() => {
      // Bước 1: Cho chữ mờ dần đi
      setIsFading(true);

      // Bước 2: Đợi 0.5 giây (cho chữ mờ hẳn) rồi mới đổi câu khác và cho sáng lại
      setTimeout(() => {
        setCurrentMsgIndex((prev) => (prev + 1) % announcements.length);
        setIsFading(false);
      }, 500); // 500ms = 0.5 giây

    }, 3500); // Cứ 3.5 giây thì vòng lặp này chạy một lần

    // Dọn dẹp đồng hồ khi chuyển trang để tránh lỗi
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full relative font-sans">
      <div className="bg-black text-white text-xs py-2 flex justify-center items-center h-8">

        <div className={`flex items-center transition-opacity text-[18px] duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'
          }`}>
          <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 inline-block"></span>
          <p >{announcements[currentMsgIndex]}</p>
        </div>

      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex-1">
            <div className="relative w-100 text-[18px]">
              <input
                type="text"
                placeholder="Bạn tìm gì hôm nay?"
                className="w-full border-b border-gray-400 pb-1 outline-none focus:border-amber-600 transition-colors bg-transparent placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <h1 className="text-3xl font-serif font-bold tracking-widest text-gray-800 flex items-center text-[40px]">
              <span className="text-amber-500 mr-1">V</span>
              LUXVIE
              <span className="text-sm align-top font-sans ml-1">&reg;</span>
            </h1>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-6">
            <div className="flex items-center border border-gray-300 rounded-full px-5 py-2.5">
              <div className="bg-red-600 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-base text-gray-700 whitespace-nowrap">
                GỌI MUA HÀNG: <strong className="text-black text-lg">0902 216 661</strong>
              </span>
            </div>

            <button className="flex flex-col items-center justify-center text-gray-700 hover:text-amber-600 transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium whitespace-nowrap">Đăng nhập</span>
            </button>

            <button className="relative flex flex-col items-center justify-center text-gray-700 hover:text-amber-600 transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-medium whitespace-nowrap">Giỏ hàng</span>
              <span className="absolute -top-1 right-2 bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center space-x-8 text-sm font-semibold text-[15px] uppercase tracking-wider">
            <li>
              <a href="/" className="block py-4 text-amber-500 transition-colors whitespace-nowrap">
                TRANG CHỦ
              </a>
            </li>
            <li className="group">
              <a href="/phong-khach" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                PHÒNG KHÁCH
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/phong-bep" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                PHÒNG BẾP
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/phong-ngu" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                PHÒNG NGỦ
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/trang-tri" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                TRANG TRÍ
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/nha-hang-cafe" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                NHÀ HÀNG & CAFE
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/ngoai-troi" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                NGOÀI TRỜI
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/van-phong" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                VĂN PHÒNG
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/trang-tri" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                Trang trí
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/thiet-ke-thi-cong" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer  whitespace-nowrap">
                THIẾT KẾ - THI CÔNG
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li className="group">
              <a href="/tin-tuc" className="flex items-center py-4 hover:text-amber-500 transition-colors cursor-pointer whitespace-nowrap">
                TIN TỨC
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;