import React, { useState } from "react";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let dataObj;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/");
    } else {
      alert(dataObj.errors);
    }
  };

  const signup = async () => {
    let dataObj;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/");
    } else {
      alert(dataObj.errors);
    }
  };

  return (
    <div className="w-full min-h-[90vh] bg-[#fce3fe] pt-[100px]">
      <div className="w-[90%] max-w-[550px] bg-white mx-auto p-[30px_40px] box-border sm:p-[30px_20px]">
        
        <h1 className="my-[15px] text-2xl sm:text-[22px] sm:my-0">
          {state}
        </h1>

        {/* Input Fields */}
        <div className="flex flex-col gap-[25px] mt-5 sm:gap-[15px]">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              className="h-[60px] w-full pl-5 border border-[#c9c9c9] outline-none
                         text-[#5c5c5c] text-[18px] box-border
                         sm:h-[50px] sm:pl-[10px] sm:text-[16px]"
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="h-[60px] w-full pl-5 border border-[#c9c9c9] outline-none
                       text-[#5c5c5c] text-[18px] box-border
                       sm:h-[50px] sm:pl-[10px] sm:text-[16px]"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="h-[60px] w-full pl-5 border border-[#c9c9c9] outline-none
                       text-[#5c5c5c] text-[18px] box-border
                       sm:h-[50px] sm:pl-[10px] sm:text-[16px]"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          className="w-full h-[60px] mt-[30px] bg-[#ff4141] text-white
                     text-[22px] font-medium cursor-pointer
                     hover:bg-red-600 transition
                     sm:h-[50px] sm:mt-[20px] sm:text-[17px]"
        >
          Continue
        </button>

        {/* Toggle Login / Signup */}
        {state === "Login" ? (
          <p className="mt-5 text-[#5c5c5c] text-[16px] font-medium">
            Create an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-[#ff4141] font-semibold cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-5 text-[#5c5c5c] text-[16px] font-medium">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-[#ff4141] font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        )}

        {/* Agree */}
        <div className="flex items-center gap-[10px] mt-[18px]
                        text-[#5c5c5c] text-[15px] font-medium">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;
