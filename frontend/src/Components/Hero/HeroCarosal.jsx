import React, { useEffect, useState } from "react"; 
import hero1 from "../Assets/hero1.jpg";
import hero2 from "../Assets/hero2.jpg";
import hero3 from "../Assets/hero3.jpg";


const slides = [
  {
    id: 1,
    img: hero1,
    title: "New Collections for Everyone",
    desc: "Latest fashions at best prices!"
  },
  {
    id: 2,
    img: hero2,
    title: "Trendy Styles 2025",
    desc: "Upgrade your wardrobe today!"
  },
  {
    id: 3,
    img: hero3,
    title: "Exclusive Offers",
    desc: "Shop now and save more!"
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  });

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-screen h-[400px] overflow-hidden left-1/2 -translate-x-1/2">
      
      {/* Slides */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-[400px] relative">
            <img
              src={slide.img}
              className="w-full h-full object-contain bg-black"
              alt="hero"
            />
            <div className="absolute top-1/3 left-10 text-white drop-shadow-xl">
              <h1 className="text-5xl font-bold">{slide.title}</h1>
              <p className="text-lg mt-3">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 bg-white/50 p-3 rounded-full hover:bg-white transition"
      >
        ⬅
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 bg-white/50 p-3 rounded-full hover:bg-white transition"
      >
        ➡
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
