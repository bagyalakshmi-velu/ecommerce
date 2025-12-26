import React from 'react';
import products from '../Components/Assets/products.png';

const Products = () => {
  return (
    <div className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      
      <h1 className="text-4xl font-bold mb-8 text-orange-500 text-center">
        Our Products
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Text Section */}
        <div>
          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-3">
            <li>Men's Fashion (Shirts, Jeans, Shoes)</li>
            <li>Women's Fashion (Dresses, Tops, Accessories)</li>
            <li>Kids Wear</li>
            <li>Seasonal Collections</li>
            <li>Exclusive Online Deals</li>
          </ul>
        </div>

        {/* Image Section */}
        <img
          src={products}
          alt="Our Products"
          className="w-full max-h-96 object-contain rounded-xl shadow-lg"

        />

      </div>
    </div>
  );
};

export default Products;
