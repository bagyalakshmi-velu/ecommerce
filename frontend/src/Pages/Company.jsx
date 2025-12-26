import React from 'react';
import company from '../Components/Assets/company.png';

const Company = () => {
  return (
    <div className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      
      <h1 className="text-4xl font-bold mb-8 text-orange-500 text-center">
        About Shopper
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Shopper is a modern e-commerce platform built to deliver the best
            online shopping experience. We offer premium fashion products for
            men, women, and kids.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to make shopping simple, fast, and enjoyable for
            everyone.
          </p>
        </div>

        <img
          src={company}
          alt="Shopper Company"
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Company;
