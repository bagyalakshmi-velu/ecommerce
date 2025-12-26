import React from 'react';

const NewsLetter = () => {
  return (
    <div
      className="
        w-[65%]
        h-[40vh]
        flex flex-col items-center justify-center
        mx-auto
        px-6 md:px-20
        mb-[150px]
        gap-6
        bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22]
        text-center
      "
    >
      {/* Title */}
      <h1 className="text-[32px] md:text-[48px] font-bold text-[#454545]">
        Get Exclusive Offers On Your Email
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-[#454545]">
        Subscribe to our newsletter and stay updated
      </p>

      {/* Input + Button Container */}
      <div
        className="
          flex items-center justify-between
          bg-white
          w-full md:w-[730px]
          h-[70px]
          rounded-full
          border border-gray-300
          overflow-hidden
        "
      >
        {/* Input */}
        <input
          type="email"
          placeholder="your email id"
          className="
            flex-1
            pl-6
            text-gray-700
            text-base
            outline-none
            border-none
          "
        />

        {/* Button */}
        <button
          className="
            w-[140px] md:w-[210px]
            h-full
            bg-black text-white
            rounded-full
            text-base
            font-medium
            cursor-pointer
          "
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
