import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import upload_area from "../Assets/upload_area.svg";


const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  // fetch existing product
  useEffect(() => {
    fetch(`http://localhost:4000/product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = async () => {
    let imageUrl = product.image;

    if (image) {
      const formData = new FormData();
      formData.append("product", image);

      const uploadRes = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.image_url;
    }

    await fetch("http://localhost:4000/updateproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        ...product,
        image: imageUrl,
      }),
    });

    alert("Product Updated");
    navigate("/admin/listproduct");
  };

  return (
    <div className="p-10 bg-white rounded-md">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      <input
        name="name"
        value={product.name}
        onChange={changeHandler}
        className="border p-2 w-full mb-3"
      />

      <input
        name="old_price"
        value={product.old_price}
        onChange={changeHandler}
        className="border p-2 w-full mb-3"
      />

      <input
        name="new_price"
        value={product.new_price}
        onChange={changeHandler}
        className="border p-2 w-full mb-3"
      />

      <select
        name="category"
        value={product.category}
        onChange={changeHandler}
        className="border p-2 w-full mb-3"
      >
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kid">Kid</option>
      </select>

      <label>
        <img
          src={image ? URL.createObjectURL(image) : product.image || upload_area}
          className="h-28 mb-3"
          alt=""
        />
        <input type="file" hidden onChange={imageHandler} />
      </label>

      <button
        onClick={updateProduct}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        UPDATE
      </button>
    </div>
  );
};

export default EditProduct;
