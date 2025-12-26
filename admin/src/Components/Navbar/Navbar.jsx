import React from 'react'
import navlogo from '../Assets/nav-logo.svg'
import navprofileIcon from '../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[60px] py-[15px] shadow-md mb-[1px] bg-white 
      max-[800px]:px-[30px]">

      {/* Logo */}
      <img 
        src={navlogo} 
        alt="logo"
        className="w-[200px] max-[800px]:w-[150px]"
      />

      {/* Profile Icon */}
      <img 
        src={navprofileIcon} 
        alt="profile"
        className="w-[75px] max-[800px]:w-[60px]"
      />
    </div>
  )
}

export default Navbar
