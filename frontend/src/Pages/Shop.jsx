import React from 'react';

import HeroCarousel from '../Components/Hero/HeroCarosal';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';


const Shop = () => {
  return (
    <div>
      <HeroCarousel/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
      
    </div>
  );
}

export default Shop;
