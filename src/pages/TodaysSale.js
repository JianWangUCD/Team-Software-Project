import React, { useEffect, useState } from 'react'
import Product from '../component/Product'
// import data from '../data';
import axios from 'axios';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../action/productAction';
import { isToday, startOfDay } from 'date-fns';

export default function TodaysSale() {

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
                products
                .filter((product) => isToday(startOfDay(new Date(product.saleStartTime))))
                .sort((a, b) => new Date(a.saleStartTime) - new Date(b.saleStartTime))
                .map((product) => (
                 <Product key = {product.id} product = {product}></Product>
                ))}
          </div>)
        }
        
      </div>
    )
  }