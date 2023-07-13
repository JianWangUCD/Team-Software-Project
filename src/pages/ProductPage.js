import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import data from '../data'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MessageBox from '../component/MessageBox';
import { BASE_URL } from '../api';


export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

      // 返回获取的状态值
      const userLogin = useSelector( state  => state.userLogin)
      const { userInfo } = userLogin

      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/product-service/flashsale/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error(error);
        }
      };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  

  if (!product){
    return <div> Product Not Found</div>;
  }

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
        {/* <h3 className="display-6  my-4">Sale Start: {product.saleStartTime}</h3> */}
        <p className="lead">Stock: {product.stock}</p>
        <button
          className="btn btn-outline-dark" 
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
  
  );
}
