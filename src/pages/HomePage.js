import React from 'react'
// import axios from 'axios';

import Home from '../component/Home';
import ProductsPage from './ProductsPage';
import TodaysSale from './TodaysSale';


export default function HomePage() {

  return (
    <div>
      <Home />
      <h2> Today's Sales</h2>
      <TodaysSale /> 
    </div>
  )
}
