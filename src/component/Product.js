import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { calculateCountdown, checkSaleStatus } from '../component/countdownUtils';
import '../index.css'
import { useSelector } from 'react-redux';
import useAxiosWithAuth from '../useAxiosWithAuth';
import { useNavigate } from 'react-router-dom';
import MessageBox from './MessageBox';

export default function Product({ product }) {

  const axios = useAxiosWithAuth();
  const navigate = useNavigate();
  const [error, setErrorMessage] = useState(null); // State to track error message

  const { isSaleStarted, isSoldout } = checkSaleStatus(product);
  const [countdown, setCountdown] = useState(calculateCountdown(product));

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

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
            console.log("Sold out");
            setErrorMessage("Sold out")
          }
        } else {
          console.error('You are not a buyer');
          setErrorMessage("You are not a buyer")
        }
      } else {
        navigate("/login", { state: { from: `/product/${product.id}` } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 定义更新倒计时的函数
    const updateCountdown = () => {
      setCountdown(calculateCountdown(product));
    };

    // 每隔一秒钟更新一次倒计时
    const interval = setInterval(updateCountdown, 1000);

    // 在组件卸载时清除定时器
    return () => {
      clearInterval(interval);
    };
  }, [product]);

  return (
    <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      { error && <MessageBox>{error}</MessageBox>}
      <div className="card text-center h-100" key={product.id}>
        <a href={`/product/${product.id}`}>
          <img className="card-img-top p-3" src={product.img} alt={product.productName} height={300} />
        </a>
        <div className="card-body">
          <h5 className="card-title">
            <a href={`/product/${product.id}`}>
              {product.productName}
            </a>
          </h5>
          {/* 根据 sale 状态返回不同的卡片内容 */}
          {isSaleStarted && !isSoldout ? (
            countdown && (
              <div className="countdown-container"> {/* 添加倒计时信息容器的 CSS 类名 */}
                <p className="lead countdown-info">
                  Sale end in: <span className="countdown-number">{countdown.days}</span> days, <span className="countdown-number">{countdown.hours}</span> hours,{' '}
                  <span className="countdown-number">{countdown.minutes}</span> minutes, <span className="countdown-number">{countdown.seconds}</span> seconds
                </p>
                <button className="btn btn-outline-dark" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            ) 
          ) : (
            <ul className="list-group list-group-flush">
            {!isSoldout ? (
      <>
        <li className="list-group-item lead">$ {product.price}</li>
        <li className="list-group-item lead">
          sale start: {format(new Date(product.saleStartTime), 'yyyy-MM-dd HH:mm:ss')}
        </li>
        <li className="list-group-item lead">
          sale end: {format(new Date(product.saleEndTime), 'yyyy-MM-dd HH:mm:ss')}
        </li>
      </>
    ) : (
      <>
      <li className="list-group-item lead"><span className='sold-out'>Sold Out</span></li>
      <li className="list-group-item lead">
      sale start: {format(new Date(product.saleStartTime), 'yyyy-MM-dd HH:mm:ss')}
    </li>
    <li className="list-group-item lead">
      sale end: {format(new Date(product.saleEndTime), 'yyyy-MM-dd HH:mm:ss')}
    </li>
    </>
      
    )}
          </ul>
          )}
        </div>
      </div>
    </div>
  )
}

