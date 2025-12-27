import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const Checkout = () => {
  const { cartItems, all_product, getTotalCartAmount } =
    useContext(ShopContext);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      // 🔹 Build items array from cart
      const items = [];

      for (const key in cartItems) {
        if (cartItems[key] > 0) {
          const [itemId, size] = key.split("_");
          const product = all_product.find(
            (p) => p.id === Number(itemId)
          );

          if (product) {
            items.push({
              productId: product.id,
              name: product.name,
              price: product.new_price,
              size,
              quantity: cartItems[key],
            });
          }
        }
      }

      if (items.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // 🔹 Send order to backend
      const res = await fetch("http://localhost:4000/api/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"), // ✅ IMPORTANT
        },
        body: JSON.stringify({
          items,
          totalAmount: getTotalCartAmount(),
          address,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error(data);
        alert(data.message || "Order failed");
        return;
      }

      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error("ORDER ERROR:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Checkout
        </h1>

        {/* Address Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={address.name}
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={address.phone}
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            onChange={handleChange}
            value={address.street}
            className="border rounded-lg px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={address.city}
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            value={address.pincode}
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Order Summary */}
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default Checkout;
