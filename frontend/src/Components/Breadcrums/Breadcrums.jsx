import React from 'react';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrums = ({ product }) => {
  return ( 
   <div className="flex items-center gap-2 text-[#5e5e5e] text-[16px] font-semibold my-14 ml-0 md:ml-10 capitalize">

      HOME <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      {product?.category} <img src={arrow_icon} alt="" />
      {product?.name}
    </div>
  );
};

export default Breadcrums;
