import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { calculateCountdown, checkSaleStatus } from '../component/countdownUtils';
import '../index.css'

export default function Product({ product }) {
  const { isSaleStarted, isSoldout } = checkSaleStatus(product);
  const [countdown, setCountdown] = useState(calculateCountdown(product));

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
                <button className="btn btn-outline-dark">
                  Checkout
                </button>
              </div>
            ) 
          ) : (
            <ul className="list-group list-group-flush">
            <li className="list-group-item lead">$ {product.price}</li>
            <li className="list-group-item lead">
              sale start: {format(new Date(product.saleStartTime), 'yyyy-MM-dd HH:mm:ss')}
            </li>
            <li className="list-group-item lead">
              sale end: {format(new Date(product.saleEndTime), 'yyyy-MM-dd HH:mm:ss')}
            </li>
          </ul>
          )}
        </div>
      </div>
    </div>
  )
}

// export default function Product({ product }) {
   
//   return (
//       <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//         <div className="card text-center h-100" key={product.id}>
//         <a href={`/product/${product.id}`}>
//                   <img className="card-img-top p-3" src={product.img} alt={product.productName} height={300} />
//                 </a>
//                 <div className="card-body">
//                   <h5 className="card-title">
//                   <a href={`/product/${product.id}`}>
//                     {product.productName}
//                   </a>
//                   </h5>
//                   <ul className="list-group list-group-flush">
//                   <li className="list-group-item lead">$ {product.price}</li>
//                   <li className="list-group-item lead">
//                     sale start: {format(new Date(product.saleStartTime), 'yyyy-MM-dd HH:mm:ss')}
//                   </li>
//                   <li className="list-group-item lead">
//                     sale end: {format(new Date(product.saleEndTime), 'yyyy-MM-dd HH:mm:ss')}
//                   </li>
//                 </ul>
                  
//                 </div>
                
//               </div>
//         </div>
                
//   )
// }
