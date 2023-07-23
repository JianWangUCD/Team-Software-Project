import React, { useEffect, useState } from 'react'
import Product from '../component/Product'
// import data from '../data';
import axios from 'axios';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../action/productAction';
import { isAfter, startOfDay, endOfDay } from 'date-fns';
import { Container } from 'react-bootstrap';



export default function ProductsPage() {

  const dispatch = useDispatch();
  // 从state中获取productList（store）产品信息
  const productList = useSelector(state => state.productList)
  const { loading, error, products} = productList
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])

  return (
    <div>
      <Container>
      {
        loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<MessageBox>{error}</MessageBox>)
        :
        (
        <div className="row center">
            {
              products
              .filter((product) => isAfter(new Date(product.saleEndTime), startOfDay(new Date())))
              .sort((a, b) => new Date(a.saleStartTime) - new Date(b.saleStartTime))
              .map((product) => (
               <Product key = {product.id} product = {product}></Product>
              ))}
        </div>)
      }
      </Container>
    </div>
  )
}

