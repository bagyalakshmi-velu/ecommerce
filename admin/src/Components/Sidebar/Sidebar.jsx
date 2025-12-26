import React from 'react';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {
  return (
    <div className="flex flex-col pt-[30px] gap-[20px] w-full max-w-[250px] h-screen bg-white
                    max-[800px]:flex-row max-[800px]:py-[30px] max-[800px]:w-full max-[800px]:max-w-none 
                    max-[800px]:h-auto max-[800px]:justify-center">

      {/* Add Product */}
      <Link to={"/admin/addproduct"} className="no-underline">
        <div className="flex items-center justify-center mx-[20px] py-[5px] px-[10px] rounded-lg bg-[#F6F6F6] gap-[20px] cursor-pointer
                        max-[800px]:mx-0">
          <img src={add_product_icon} alt="" />
          <p className="text-black">Add Product</p>
        </div>
      </Link>

      {/* Product List */}
      <Link to={"/admin/listproduct"} className="no-underline">
        <div className="flex items-center justify-center mx-[20px] py-[5px] px-[10px] rounded-lg bg-[#F6F6F6] gap-[20px] cursor-pointer
                        max-[800px]:mx-0">
          <img src={list_product_icon} alt="" />
          <p className="text-black">Product List</p>
        </div>
      </Link>

    </div>
  );
};

export default Sidebar;
