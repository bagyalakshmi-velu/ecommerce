import React from "react";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div
      className="
        w-[90%] md:w-[80%] lg:w-[70%]
        mx-auto
        my-20
        rounded-2xl
        bg-gradient-to-b from-pink-100 to-green-100/40
        flex flex-col md:flex-row
        items-center justify-between
        p-8 md:p-14
      "
    >
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-3 md:gap-4 flex-1">
        <h1 className="text-gray-900 text-4xl md:text-5xl font-bold leading-tight">
          Exclusive
        </h1>
        <h1 className="text-gray-900 text-4xl md:text-5xl font-bold leading-tight">
          Offers for you
        </h1>

        <p className="text-gray-700 text-lg md:text-xl font-semibold mt-2">
          ONLY BEST SELLERS PRODUCT
        </p>

        <button
          className="
            bg-red-500 
            text-white 
            w-[180px] 
            md:w-[220px]
            h-[55px]
            rounded-full
            text-lg 
            md:text-xl 
            font-medium
            mt-4
            hover:bg-red-600
            transition
          "
        >
          Check Now
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
        <img
          src={exclusive_image}
          className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[350px]"
          alt="Exclusive Offers"
        />
      </div>
    </div>
  );
};

export default Offers;
