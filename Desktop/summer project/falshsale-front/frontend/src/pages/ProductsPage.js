import React, { useEffect, useState } from 'react'
import Product from '../component/Product'
// import data from '../data';
import axios from 'axios';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';



export default function ProductsPage() {

const username = '111';
const password = '111';

const credentials = window.btoa(username + ':' + password);
const headers = {
  'Authorization': 'Basic ' + credentials,
  'Content-Type': 'application/json'
};
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect (() => {
    const fecthData = async ()  => {
      try{
        setLoading(true);
        // const { data } = await axios.get('http://localhost:8000/products');
        const { data } = await axios.get('http://localhost:8080/api/flashsale/products', { headers });
        setLoading(false);
        setProducts(data);
      } catch(err){
        setError(err.meesage);
        setLoading(false);
      }
  
    };
    // call function to get data
    fecthData();
   }, []);

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

