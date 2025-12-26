import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-8 py-10">

      {/* LEFT */}
      <div className="flex gap-5">
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={product.image}
              alt=""
              className="h-36 w-28 object-cover rounded-md border"
            />
          ))}
        </div>

        <img
          src={product.image}
          alt=""
          className="w-[550px] h-[650px] object-cover rounded-xl border"
        />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-5 max-w-xl">

        <h1 className="text-3xl font-semibold">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <img key={i} src={star_icon} alt="" className="w-6" />
          ))}
          <img src={star_dull_icon} alt="" className="w-6" />
          <p className="text-gray-600 ml-2">(122 reviews)</p>
        </div>

        {/* Price */}
        <div className="flex gap-4 items-center">
          <span className="line-through text-gray-400">
            ₹{product.old_price}
          </span>
          <span className="text-2xl font-bold text-green-600">
            ₹{product.new_price}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700">
          Lightweight, breathable knitted shirt with a comfortable pullover
          design. Perfect for daily wear.
        </p>

        {/* SIZE SELECTION */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Size</h2>
          <div className="flex gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md font-medium
                  ${
                    selectedSize === size
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-200"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={() => addToCart(product.id, selectedSize)}
          className="mt-5 bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-black"
        >
          ADD TO CART
        </button>

        {/* Info */}
        <p>
          <strong>Category:</strong> Kids, Hoodie
        </p>
        <p>
          <strong>Tags:</strong> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
