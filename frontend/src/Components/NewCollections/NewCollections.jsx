import React from 'react';

import Item from '../Item/Item';
import { useState } from 'react';
import { useEffect } from 'react';

const NewCollections = () => {
  const [new_collection,setNew_collection] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  },[])



  return (
    <div className="flex flex-col items-center gap-4 py-10">

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
        NEW COLLECTIONS
      </h1>

      {/* Underline */}
      <hr className="w-32 md:w-48 h-1.5 bg-gray-800 rounded-lg" />

      {/* Grid Items */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          gap-6 
          mt-10 
          px-4
        "
      >
        {new_collection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

    </div>
  );
};

export default NewCollections;
