import React from 'react';
import company from '../Components/Assets/company.png';


const About = () => {
  return (
    <div className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-orange-500">Who We Are</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Shopper was founded with a vision to create a trusted online shopping
        platform. We focus on quality, customer satisfaction, and fast delivery.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        We continuously improve our platform using the latest web technologies
        like MERN stack to give users a smooth experience.
      </p>
       <img
                src={company}
                alt="Shopper Company"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
    </div>
  );
};

export default About;
