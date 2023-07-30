import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import data from '../data'
import { useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import MessageBox from '../component/MessageBox';
import { BASE_URL } from '../api';
import { format } from 'date-fns';
import useAxiosWithAuth from '../useAxiosWithAuth';


import { calculateCountdown, checkSaleStatus } from '../component/countdownUtils';
import { Container } from 'react-bootstrap';


export default function ProductPage() {

  const axios = useAxiosWithAuth();
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isSaleStarted, setIsSaleStarted] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // 返回获取的状态值
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/product-service/flashsale/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (userInfo) {
        if (userInfo.role === "buyer") {
          const response = await axios.get(
            `/order-service/flashsale/stock-check`,
            {
              params: {
                productId: product.id
              },
            }
          );
          if (response.data) {
            // <MessageBox>You got the item</MessageBox>
            navigate(`/checkout?userId=${userInfo.id}&productId=${product.id}`)
          } else {
            // <MessageBox>Sold out</MessageBox>
            console.log("Sold out")
          }
        } else {
          console.error('You are not a buyer');
          // <MessageBox>You are not a buyer</MessageBox>
        }
      } else {
        navigate("/login", { state: { from: `/product/${id}` } });
      }
    } catch (error) {
      if (error.response && error.response.status === 401){
        
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);



  useEffect(() => {

    if (product) {
      const interval = setInterval(() => {
        const { isSaleStarted, isSoldout } = checkSaleStatus(product);
        setIsSaleStarted(isSaleStarted);
        setIsSoldOut(isSoldout);

        
          const countdown = calculateCountdown(product);
          setCountdown(countdown);
        //
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [product]);


  if (!product) {
    return <div> Product Not Found</div>;
  }


  return (
    // <Container>
    // <Link className='btn btn-dark my-3' to='/products'> return </Link>
    
    <div className="container my-5 py-2">
      
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

          { isSaleStarted && !isSoldOut ? (
             countdown && (
              <p className="lead countdown-info">
            Sale end in: <span className="countdown-number">{countdown.days}</span> days, <span className="countdown-number">{countdown.hours}</span> hours,{' '}
                  <span className="countdown-number">{countdown.minutes}</span> minutes, <span className="countdown-number">{countdown.seconds}</span> seconds
                </p>
             )
          ) : (countdown && 
                <p className="lead countdown-info">
                  Sale start in: <span className="countdown-number">{countdown.days}</span> days, <span className="countdown-number">{countdown.hours}</span> hours,{' '}
                  <span className="countdown-number">{countdown.minutes}</span> minutes, <span className="countdown-number">{countdown.seconds}</span> seconds
                </p>
            )
          }
          

          <button
            className="btn btn-outline-dark"
            onClick={handleCheckout}
            disabled={!isSaleStarted || isSoldOut}
          >
            Checkout
          </button>


        </div>
      </div>
    </div>
    // </Container>
  );
}
