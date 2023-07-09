import React, { useEffect, useState } from 'react'
// import axios from 'axios';

import Home from '../component/Home';
import ProductsPage from './ProductsPage';


export default function HomePage() {
  // const dispatch = useDispatch();
  // // 从state中获取productList（store）产品信息
  // const productList = useSelector(state => state.productList)
  // const { loading, error, products} = productList
  // useEffect(() => {
  //   dispatch(listProducts())
  // },[dispatch])

  return (
    <div>
      <Home />
      <ProductsPage />
      {/* {
        loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<MessageBox>{error}</MessageBox>)
        :
        (
        <div className="row center">
            {
              products.map((product) => (
               <Product key = {product.id} product = {product}></Product>
              ))}
        </div>
        )
      } */}
      
    </div>
  )
}
