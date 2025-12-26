import React, { useState } from 'react';
import upload_area from "../Assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    });
  };

  const Add_Product =async() => {
    console.log(productDetails);
    let responseData;
   let product = { ...productDetails };
    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
     method:"post",
     headers:{
      Accept:'application/json',
     },
     body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})
    if(responseData.success)
    {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'post',
        headers:{
          Accept:'application/json',
          'content-Type':'application/json',

        },
        body:JSON.stringify(product),
     }).then((resp)=>resp.json()).then((data)=>{
      data.success?alert("Product Added"): alert("Failed")
     })
    }
  };

  return (
    <div className="box-border w-full max-w-[800px] p-[30px_50px] m-[20px_30px] rounded-lg bg-white">

      <div className="w-full text-[#7b7b7b] text-[16px]">
        <p>Product title</p>
        <input 
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          className="box-border w-full h-[50px] rounded-md pl-[15px] border border-[#c3c3c3]"
        />
      </div>

      <div className="w-full text-[#7b7b7b] text-[16px] mt-4">
        <p>Product description</p>
        <input 
          value={productDetails.description}
          onChange={changeHandler}
          type="text" 
          name="description"
          placeholder="Type here"
          className="box-border w-full h-[50px] rounded-md pl-[15px] border border-[#c3c3c3]"
        />
      </div>

      <div className="flex gap-[40px] mt-4">
        <div className="w-full text-[#7b7b7b] text-[16px]">
          <p>Price</p>
          <input 
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Type here"
            className="box-border w-full h-[50px] rounded-md pl-[15px] border border-[#c3c3c3]"
          />
        </div>

        <div className="w-full text-[#7b7b7b] text-[16px]">
          <p>Offer Price</p>
          <input 
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Type here"
            className="box-border w-full h-[50px] rounded-md pl-[15px] border border-[#c3c3c3]"
          />
        </div>
      </div>

      <div className="w-full text-[#7b7b7b] text-[16px] mt-4">
        <p>Product Category</p>
        <select 
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="p-[10px] w-[100px] h-[50px] border rounded-md"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="file-input" className="cursor-pointer inline-block">
          <img 
            src={image ? URL.createObjectURL(image) : upload_area} 
            alt=""
            className="h-[120px] w-[120px] rounded-[10px] object-contain"
          />
        </label>
        <input 
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button 
        onClick={Add_Product}
        className="mt-[40px] w-[160px] h-[50px] rounded-lg bg-[#6079ff] text-white cursor-pointer"
      >
        ADD
      </button>

    </div>
  );
};

export default AddProduct;
