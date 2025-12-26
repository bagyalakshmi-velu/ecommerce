import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import Shop from './Pages/Shop';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import ShopCategory from './Pages/ShopCategory';

import Company from './Pages/Company';
import Products from './Pages/Products';
import Offices from './Pages/Offices';
import About from './Pages/About';
import Contact from './Pages/Contact';

import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

import ShopContextProvider from "./Context/ShopContext";

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>

          {/* Pages WITH footer */}
          <Route
            path="/"
            element={
              <>
                <Shop />
                <Footer />
              </>
            }
          />

          <Route
            path="/mens"
            element={
              <>
                <ShopCategory banner={men_banner} category="men" />
                <Footer />
              </>
            }
          />

          <Route
            path="/womens"
            element={
              <>
                <ShopCategory banner={women_banner} category="women" />
                <Footer />
              </>
            }
          />

          <Route
            path="/kids"
            element={
              <>
                <ShopCategory banner={kid_banner} category="kid" />
                <Footer />
              </>
            }
          />

          <Route
            path="/product/:productId"
            element={
              <>
                <Product />
                <Footer />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <Cart />
                <Footer />
              </>
            }
          />

          {/* Pages WITHOUT footer */}
          <Route path="/company" element={<Company />} />
          <Route path="/products" element={<Products />} />
          <Route path="/offices" element={<Offices />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginSignup />} />

        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
