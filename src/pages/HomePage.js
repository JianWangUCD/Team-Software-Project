import React from 'react'

import Home from '../component/Home';
import SaleNowPage from './SaleNowPage';


export default function HomePage() {

  return (
    <div>
      <Home />
      <div className="container text-left my-3">
      <h2 className="d-inline-block px-3">Selling Now</h2>
      </div>
      <SaleNowPage /> 
    </div>
  )
}
