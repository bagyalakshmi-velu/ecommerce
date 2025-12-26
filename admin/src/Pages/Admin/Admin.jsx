import React from "react";

import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import EditProduct from "../../Components/EditProduct/EditProduct";


const Admin = () => {
  return (
    <div className="flex max-[800px]:flex-col">
      <Sidebar />

      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        

      </Routes>
    </div>
  );
};

export default Admin;
