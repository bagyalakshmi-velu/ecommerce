import React, { useContext } from 'react';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="">
      {/* Banner */}
      <img
        className="block mx-auto my-[30px] w-[82%]"
        src={props.banner}
        alt=""
      />

      {/* Index + Sort */}
      <div
  className="
    flex flex-col md:flex-row 
    justify-between items-start md:items-center
    gap-4
    w-[90%] md:w-[82%]
    mx-auto
    px-4 py-3 
    rounded-[40px] 
    border border-gray-500
  "
>
  <p className="text-sm md:text-base">
    <span className="font-semibold">Showing 1-12</span> out of 36 products
  </p>

  <div className="flex items-center gap-2 cursor-pointer text-sm md:text-base">
    Sort by <img className="w-3 md:w-4" src={dropdown_icon} alt="" />
  </div>
</div>


      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-y-[80px] m-[10px]">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null;
        })}
      </div>
      <div
  className="
    flex items-center justify-center
    mx-auto my-[150px]
    w-[233px] h-[69px]
    rounded-[75px]
    bg-[#ededed] text-[#787878]
    text-[18px] font-medium
    cursor-pointer
    hover:bg-gray-300 transition
  "
>
  Explore More
</div>

    </div>
  );
};

export default ShopCategory;
