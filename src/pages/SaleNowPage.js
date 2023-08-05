import React, { useEffect, useState } from 'react'
import Product from '../component/Product'
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../action/productAction';
import { Container } from 'react-bootstrap';

export default function SaleNowPage() {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList
    useEffect(() => {
      dispatch(listProducts())
    },[dispatch])

    if(!products){
      return <div></div>;
    }
  
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
                .filter((product) => new Date(product.saleStartTime) <= new Date() &&
                new Date(product.saleEndTime) > new Date())
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