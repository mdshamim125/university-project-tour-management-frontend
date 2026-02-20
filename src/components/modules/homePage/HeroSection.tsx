/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

import sliderOne from "../../../../src/assets/images/slider-1.jpg";
import sliderTwo from "../../../../src/assets/images/slider-2.jpg";
import sliderThree from "../../../../src/assets/images/slider-3.jpg";
import sliderFour from "../../../../src/assets/images/slider-4.jpg";
import sliderFive from "../../../../src/assets/images/slider-5.jpg";
import sliderSix from "../../../../src/assets/images/slider-6.jpg";

const slides = [
  {
    img: sliderOne,
    title: "Explore the Majestic Mountains",
    subtitle: "Discover breathtaking mountain landscapes and adventure tours.",
  },
  {
    img: sliderTwo,
    title: "Relax on Tropical Beaches",
    subtitle: "Unwind on pristine beaches with crystal clear waters.",
  },
  {
    img: sliderThree,
    title: "Cultural City Tours",
    subtitle: "Experience vibrant cities filled with history and culture.",
  },
  {
    img: sliderFour,
    title: "Safari Adventures",
    subtitle:
      "Get close to wildlife and explore breathtaking safari destinations.",
  },
  {
    img: sliderFive,
    title: "Romantic Getaways",
    subtitle: "Escape with your loved one to serene and peaceful retreats.",
  },
  {
    img: sliderSix,
    title: "Adventure & Hiking Trails",
    subtitle: "Challenge yourself with scenic hiking and adventure routes.",
  },
];

export default function HeroSection() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="relative w-full">
      {/* Main Hero Swiper */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 h-[350px] md:h-[450px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8 md:p-16">
                <div className="max-w-2xl space-y-3">
                  <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {slide.title}
                  </h2>

                  <p className="text-gray-100 text-lg md:text-xl drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-4 h-[120px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={slide.img}
              alt={`Thumbnail ${idx}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
