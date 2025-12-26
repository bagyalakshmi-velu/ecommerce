import React from 'react';
import offices from '../Components/Assets/offices.png';


const Offices = () => {
  return (
    <div className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-orange-500">
        Our Offices
      </h1>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-lg text-gray-700 space-y-4">
          <p><strong>Head Office:</strong> Bangalore, India</p>
          <p><strong>Branch Office:</strong> Chennai, India</p>
          <p><strong>Branch Office:</strong> Hyderabad, India</p>
          <p><strong>Global Support:</strong> Online 24/7</p>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2">
          <img
            src={offices}
            alt="Our Offices"
            className="w-full max-h-96 object-contain rounded-xl shadow-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default Offices;
