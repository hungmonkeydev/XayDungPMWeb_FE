import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Dùng cho hiệu ứng mờ dần


const Carousel = ({ children, settings, className }) => {
  // Cài đặt mặc định nếu không truyền settings từ ngoài vào
  const defaultSettings = {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: false, // Hiện mũi tên
    pagination: { clickable: false }, // Hiện chấm tròn điều hướng
    autoplay: { delay: 9000, disableOnInteraction: false }, // Tự chuyển sau 5s
    loop: true, // Lặp lại vô hạn
    ...settings, // Gộp cài đặt từ bên ngoài vào
  };

  return (
    <div className={`swiper-container-wrapper h-full ${className || ''}`}>
      <Swiper {...defaultSettings} className="mySwiper h-full">
        {children}
      </Swiper>
    </div>
  );
};

// Component con để bọc từng slide
Carousel.Slide = SwiperSlide;

export default Carousel;