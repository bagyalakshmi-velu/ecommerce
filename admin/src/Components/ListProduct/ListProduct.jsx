import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const navigate = useNavigate(); // ✅ INSIDE component

  // Fetch all products
  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:4000/allproducts");
      const data = await res.json();
      setAllProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove product
  const remove_product = async (id) => {
    try {
      await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      fetchInfo(); // refresh list
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] p-[10px_50px] m-[30px] rounded-md bg-white">
      
      <h1 className="text-xl font-semibold mb-4">All Product List</h1>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] gap-2 w-full py-5 font-semibold text-[#454545]">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>

      <div className="w-full overflow-y-auto">
        <hr />

        {allproducts.length > 0 ? (
          allproducts.map((product) => (
            <React.Fragment key={product.id}>
              <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-5 items-center text-[#454545]">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20"
                />

                <p>{product.name}</p>
                <p>₹{product.old_price}</p>
                <p>₹{product.new_price}</p>
                <p>{product.category}</p>

                {/* ✅ EDIT BUTTON */}
                <button
                  onClick={() => navigate(`/admin/editproduct/${product.id}`)}
                  className="text-blue-500 underline"
                >
                  Edit
                </button>

                {/* ❌ REMOVE */}
                <img
                  onClick={() => remove_product(product.id)}
                  src={cross_icon}
                  alt="remove"
                  className="cursor-pointer mx-auto"
                />
              </div>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
