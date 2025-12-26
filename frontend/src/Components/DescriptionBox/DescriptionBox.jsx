import React from "react";

const DescriptionBox = () => {
  return (
    <div className="w-full md:w-[80%] mx-auto mt-14 border rounded-lg bg-white shadow-sm">
      
      {/* Tabs */}
      <div className="flex border-b">
        <div className="px-6 py-3 font-semibold text-black border-r cursor-pointer">
          Description
        </div>
        <div className="px-6 py-3 font-semibold text-gray-500 cursor-pointer">
          Reviews (122)
        </div>
      </div>

      {/* Description Text */}
      <div className="p-6 text-[#555] leading-7 text-[15px]">
        <p>
          Our e-commerce website is a modern online shopping platform designed to
          provide customers with a smooth, fast, and enjoyable shopping experience.
          Built using the latest technologies, it allows users to browse products,
          view detailed descriptions, compare prices, and make secure purchases—
          all from the comfort of their devices.
        </p>

        <p className="mt-4">
          We offer a wide variety of products for men, women, and kids, along with
          clear product images, price details, customer reviews, and multiple size
          options. Our goal is to make online shopping simple, accessible, and
          reliable for everyone.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
