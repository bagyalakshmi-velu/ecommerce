import React from "react";
import Item from "../Item/Item";
import data_product from "../Assets/data";

const RelatedProduct = () => {
  return (
    <div className="flex flex-col items-center gap-2.5 py-2 pb-24">
      <h1 className="text-[#171717] text-[40px] font-semibold max-sm:text-[30px]">
        Related Products
      </h1>

      <hr className="w-[150px] h-1 rounded-full bg-[#252525] border-none max-sm:w-[100px]" />

      {/* 4 products in one row */}
      <div className="mt-12 grid grid-cols-4 gap-8 max-w-[1280px] w-full
                      max-lg:grid-cols-3
                      max-md:grid-cols-2
                      max-sm:grid-cols-1">
        {data_product.slice(0, 4).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
