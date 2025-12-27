import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";



const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);
  const navigate = useNavigate();


  return (
    <div className="my-24 mx-[10%]">

      {/* HEADER */}
      <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] gap-12 py-5 font-semibold max-[500px]:hidden">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Qty</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {/* CART ITEMS */}
      {Object.keys(cartItems).map((key) => {
        const [id, size] = key.split("_");
        const qty = cartItems[key];

        const product = all_product.find(
          (p) => p.id === Number(id)
        );

        if (!product || qty <= 0) return null;

        return (
          <div key={key}>
            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] gap-12 py-5 items-center">

              <img src={product.image} className="h-[55px]" />

              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">Size: {size}</p>
              </div>

              <p>₹{product.new_price}</p>

              <button className="border w-[50px]">
                {qty}
              </button>

              <p>₹{product.new_price * qty}</p>

              <img
                src={remove_icon}
                className="w-[12px] cursor-pointer"
                onClick={() => removeFromCart(key)}
              />
            </div>
            <hr />
          </div>
        );
      })}

      {/* TOTALS */}
      <div className="mt-20 max-w-md">
        <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>

        <div className="flex justify-between py-2">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>

        <div className="flex justify-between py-2">
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <hr />

        <div className="flex justify-between py-3 font-semibold">
          <p>Total</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>

        <button onClick={() => navigate("/checkout")} className="mt-5 bg-red-500 text-white w-full py-3 rounded-md font-semibold">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartItems;
