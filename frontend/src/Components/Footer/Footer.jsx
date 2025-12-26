import React from 'react';
import { Link } from 'react-router-dom';

import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 py-12">

      {/* Logo */}
      <div className="flex items-center gap-5">
        <img src={footer_logo} alt="logo" className="w-20 sm:w-28 md:w-36 lg:w-44 xl:w-52" />

        <p className="text-6xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
          SHOPPER
        </p>
      </div>

      {/* Footer Links */}
      <ul className="flex flex-wrap justify-center gap-8 md:gap-12 text-lg">
        <li><Link to="/company" className="hover:text-orange-400">Company</Link></li>
        <li><Link to="/products" className="hover:text-orange-400">Products</Link></li>
        <li><Link to="/offices" className="hover:text-orange-400">Offices</Link></li>
        <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
        <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
      </ul>

      {/* Social Icons */}
      <div className="flex gap-5">
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <img src={instagram_icon} className="w-6 cursor-pointer" />
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
          <img src={pintester_icon} className="w-6 cursor-pointer" />
        </a>
        <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
          <img src={whatsapp_icon} className="w-6 cursor-pointer" />
        </a>
      </div>

      {/* Copyright */}
      <div className="flex flex-col items-center gap-6 w-full text-lg">
        <hr className="w-[80%] h-[3px] bg-[#c7c7c7] rounded-lg border-none" />
        <p>Copyright © 2025 - All Rights Reserved.</p>
      </div>

    </div>
  );
};

export default Footer;
