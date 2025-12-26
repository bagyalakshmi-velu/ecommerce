import React from 'react';
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div
      className="
        w-full sm:w-[260px] md:w-[300px] lg:w-[350px]
        hover:scale-105 transition-transform duration-300
        bg-white rounded-xl shadow-sm
      "
    >
      {/* Image */}
     <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)}
        src={props.image}
        alt=""
        className="w-full h-auto rounded-t-xl"
      /></Link> 

      {/* Content Box */}
      <div className="p-4">
        {/* Product Name */}
        <p className="text-gray-700 text-base md:text-lg font-medium mb-2">
          {props.name}
        </p>

        {/* Price Section */}
        <div className="flex gap-4 items-center">
          <span className="text-gray-900 text-lg font-semibold">
            ₹{props.new_price}
          </span>

          <span className="text-gray-500 text-lg line-through">
            ₹{props.old_price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Item;
