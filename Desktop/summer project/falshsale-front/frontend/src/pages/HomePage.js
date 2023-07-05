import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../component/Product';

import Home from '../component/Home';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { listProducts } from '../action/productAction';


export default function HomePage() {
  const dispatch = useDispatch();
  // 从state中获取productList（store）产品信息
  const productList = useSelector(state => state.productList)
  const { loading, error, products} = productList
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])


  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // useEffect (() => {
    // const fecthData = async ()  => {
      // try{
      //   setLoading(true);
      //   // const { data } = await axios.get('http://localhost:8000/products');
      //   const { data } = await axios.get('http://localhost:8080/api/flashsale/products');
      //   setLoading(false);
      //   setProducts(data);
      // } catch(err){
      //   setError(err.meesage);
      //   setLoading(false);
      // }
  
    // };
    // call function to get data
    // fecthData();
  //  }, []);

  return (
    <div>
      <Home />
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
        </div>
        )
      }
      
    </div>
  )
}
