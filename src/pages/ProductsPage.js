import React, { useEffect, useState } from 'react'
import Product from '../component/Product'
// import data from '../data';
import axios from 'axios';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../action/productAction';



export default function ProductsPage() {

  
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const dispatch = useDispatch();
  // 从state中获取productList（store）产品信息
  const productList = useSelector(state => state.productList)
  const { loading, error, products} = productList
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])

  return (
    <div>
      {
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
        </div>)
      }
      
    </div>
  )
}

