import React from 'react'

import Home from '../component/Home';
import TodaysSale from './TodaysSale';


export default function HomePage() {

  return (
    <div>
      <Home />
      <div className="container text-left my-3">
      <h2 className="d-inline-block px-3">Today's Sales</h2>
      </div>
      <TodaysSale /> 
    </div>
  )
}
