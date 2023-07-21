import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import data from '../data'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MessageBox from '../component/MessageBox';
import { BASE_URL } from '../api';
import { format } from 'date-fns';


export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isSaleStarted, setIsSaleStarted] = useState(false);

  // 返回获取的状态值
  const userLogin = useSelector( state  => state.userLogin)
  const { userInfo } = userLogin

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/product-service/flashsale/products/${id}`);
      setProduct(response.data);
      setIsSaleStarted(Date.now() >= new Date(response.data.saleStartTime));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (userInfo){
        if (userInfo.role === "buyer") {
          
          const response = await axios.get(
            `${BASE_URL}/order-service/flashsale/stock-check`,
            {
              params: {
                productId: product.id
              },
            }
          );
            if (response.data){
              // <MessageBox>You got the item</MessageBox>
              navigate(`/checkout?userId=${userInfo.id}&productId=${product.id}`)
            }else{
              // <MessageBox>Sold out</MessageBox>
              console.log("Sold out")
            }          
            // fetchProduct();
            // // 进行一些成功提示或导航到订单详情页面等操作
            // navigate(`/product/${product.id}`)
        } else {
          console.error('You are not a buyer');
          // <MessageBox>You are not a buyer</MessageBox>
        }
      } else { 
        navigate("/login", { state: { from: `/product/${id}` } });
    }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchProduct();
  }, [id]);

  const checkSaleStatus = () => {
    if (product) {
      setIsSaleStarted(Date.now() >= new Date(product.saleStartTime));
    }
  };

  useEffect(() => {
    // Check the sale status initially when the component mounts
    checkSaleStatus();

    // Set an interval to check the sale status every second (or adjust the interval as needed)
    const interval = setInterval(checkSaleStatus, 1000);

    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(interval);
  }, [product]); // Add "product" as a dependency for the second useEffect hook

  
  if (!product){
    return <div> Product Not Found</div>;
  }

  
  return (
    <div className="container my-5 py-2">
    <Link className = 'btn btn-dark my-3'  to='/products'> return </Link>
    <div className="row">
      <div className="col-md-6 col-sm-12 py-3">
        <img
          className="img-fluid"
          src={product.img} alt={product.productName}
          width="400px"
          height="400px"
        />
      </div>
      <div className="col-md-6 col-md-6 py-5">
        <h4 className="text-uppercase text-muted">catogory</h4>
        <h1 className="display-5">{product.productName}</h1>

        <h3 className="display-6  my-4">${product.price}</h3>
        <p className="lead">{product.detail}</p>
        <h3 className="lead">Sale Start: {format(new Date(product.saleStartTime), 'yyyy-MM-dd HH:mm:ss')}</h3>
        
        <p className="lead">Stock: {product.stock}</p>
        <button
            className="btn btn-outline-dark"
            onClick={handleCheckout}
            disabled={!isSaleStarted}
          >
          Checkout
        </button>
      </div>
    </div>
  </div>
  
  );
}
