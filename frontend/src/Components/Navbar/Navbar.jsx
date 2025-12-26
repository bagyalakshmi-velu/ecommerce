import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdownToggle = (e) => {
  const menu = menuRef.current;

  menu.classList.toggle("opacity-0");
  menu.classList.toggle("scale-95");
  menu.classList.toggle("-translate-y-2");
  menu.classList.toggle("pointer-events-none");

  e.target.classList.toggle("rotate-90");
};


  return (
    <div className="flex justify-between items-center shadow-md px-[70px] py-4
                    max-[900px]:px-10 max-[750px]:px-5 max-[500px]:px-4">

      {/* Logo */}
      <Link
        to="/"
        onClick={() => setMenu("shop")}
        className="flex items-center gap-2 no-underline"
      >
        <img
  src={logo}
  alt="logo"
  className="w-12 max-[500px]:w-9"
/>

<p
  className="
    text-[32px] max-[500px]:text-[22px]
    font-bold
    bg-gradient-to-r from-red-600 via-orange-500 to-red-600
    bg-clip-text text-transparent
    tracking-wide
  "
>
  SHOPPER
</p>

      </Link>

      {/* Dropdown Icon */}
      <img
        src={nav_dropdown}
        onClick={dropdownToggle}
        className="hidden max-[750px]:block w-[30px] -rotate-90 transition-transform duration-500"
        alt=""
      />

      {/* Menu */}
      <ul
  ref={menuRef}
  className="
    flex items-center gap-10 text-[#626262] text-base font-medium list-none
    transition-all duration-300 ease-in-out

    max-[900px]:gap-4

    max-[750px]:absolute max-[750px]:top-[60px]
    max-[750px]:left-0 max-[750px]:w-full
    max-[750px]:bg-white max-[750px]:justify-center
    max-[750px]:h-[80px]

    max-[750px]:opacity-0
    max-[750px]:scale-95
    max-[750px]:-translate-y-2
    max-[750px]:pointer-events-none
  "
>

        {["shop", "mens", "womens", "kids"].map((item) => (
          <li
            key={item}
            onClick={() => setMenu(item)}
            className="flex flex-col items-center cursor-pointer gap-1"
          >
            <Link
              to={item === "shop" ? "/" : `/${item}`}
              className="no-underline"
            >
              {item === "mens"
                ? "Men"
                : item === "womens"
                ? "Women"
                : item === "kids"
                ? "Kids"
                : "Shop"}
            </Link>

            <div
  className={`h-[3px] bg-[#FF4141] rounded-full transition-all duration-300
  ${menu === item ? "w-full" : "w-0"}`}
/>
          </li>
        ))}
      </ul>

      {/* Login & Cart */}
      <div className="flex items-center gap-8
                      max-[750px]:gap-4
                      max-[500px]:gap-2 max-[500px]:scale-90">

        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
            className="
  w-[120px] h-[40px] border border-red-600
  rounded-full text-red-600 text-base font-medium bg-white
  transition-all duration-200
  hover:bg-red-500 hover:text-white hover:border-orange-500
  active:scale-95
"

          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button
              className="
  w-[120px] h-[40px] border border-red-600
  rounded-full text-red-600 text-base font-medium bg-white
  transition-all duration-200
  hover:bg-red-500 hover:text-white hover:border-orange-500
  active:scale-95
"

            >
              Login
            </button>
          </Link>
        )}

        <Link to="/cart" className="relative">
          <img
  src={cart_icon}
  alt="cart"
  className="w-9 transition-transform duration-200 hover:scale-110"
/>

          <div
            className="absolute -top-2 -right-2 w-[18px] h-[18px]
                       bg-red-600 text-white text-sm rounded-full
                       flex items-center justify-center
                       max-[750px]:-right-3"
          >
            {getTotalCartItems()}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
