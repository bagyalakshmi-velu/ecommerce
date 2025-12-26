import React from 'react';
import support from '../Components/Assets/support.png';

const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-orange-500 text-center">
        Contact Us
      </h1>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Left: Contact Details */}
        <div className="md:w-1/2 text-lg text-gray-700 space-y-4">
          <p><strong>Email:</strong> support@shopper.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Working Hours:</strong> Mon – Sat (9 AM – 6 PM)</p>
          <p><strong>Address:</strong> Bangalore, Karnataka, India</p>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2">
          <img
            src={support}
            alt="Support Team"
            className="w-full max-h-96 object-contain rounded-xl shadow-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default Contact;
