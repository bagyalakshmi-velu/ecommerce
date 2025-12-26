import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState({});

  /* ================= FETCH PRODUCTS & CART ================= */
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAll_product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  /* ================= ADD TO CART (WITH SIZE) ================= */
  const addToCart = (itemId, size) => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    const key = `${itemId}_${size}`;

    setCartItems((prev) => ({
      ...prev,
      [key]: prev[key] ? prev[key] + 1 : 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          Accept: "application/json",
        },
        body: JSON.stringify({ itemId, size }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Added:", data));
    }
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = (key) => {
    const [itemId, size] = key.split("_");

    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          Accept: "application/json",
        },
        body: JSON.stringify({ itemId, size }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Removed:", data));
    }
  };

  /* ================= TOTAL AMOUNT ================= */
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const key in cartItems) {
      const [id] = key.split("_");
      const product = all_product.find(
        (p) => p.id === Number(id)
      );

      if (product) {
        totalAmount += product.new_price * cartItems[key];
      }
    }
    return totalAmount;
  };

  /* ================= TOTAL ITEMS ================= */
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const key in cartItems) {
      totalItems += cartItems[key];
    }
    return totalItems;
  };

  /* ================= CONTEXT VALUE ================= */
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
