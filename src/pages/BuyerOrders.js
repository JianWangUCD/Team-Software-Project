
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

// 等待Orders修改
export default function BuyerOrders() {

  const navigate = useNavigate();
  // 返回获取的状态值
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchOrderHistory = async () => {
  //     try {
  //       const ordersResponse = await axios.get(
  //         `${BASE_URL}/order-service/flashsale/user/${userInfo.id}/orders`
  //       );
  //       const ordersData = ordersResponse.data;
  //       setOrders(ordersData);
  //       console.log("Orders:", ordersData);
  //     } catch (error) {
  //       console.error('Error fetching order history:', error);
  //     }
  //   };

  //   fetchOrderHistory();
  // }, [userInfo.id]);

  // useEffect(() => {
  //   const fetchProductInformation = async () => {
  //     try {
  //       const productIds = orders.map((order) => order.productId);
  //       const productsResponse = await Promise.all(
  //         productIds.map((productId) =>
  //           axios.get(`${BASE_URL}/product-service/flashsale/products/${productId}`)
  //         )
  //       );
  //       const productsData = productsResponse.map((response) => response.data);
  //       setProducts(productsData);
  //       console.log("Products:", productsData);
  //     } catch (error) {
  //       console.error('Error fetching product information:', error);
  //     }
  //   };

  //   fetchProductInformation();
  // }, [orders]);


  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const ordersResponse = await axios.get(
          `${BASE_URL}/order-service/flashsale/user/${userInfo.id}/orders`
        );
        const ordersData = ordersResponse.data;
        setOrders(ordersData);
        console.log("Orders:", ordersData);

        const productIds = ordersData.map((order) => order.productId);

        const productsResponse = await Promise.all(
          productIds.map((productId) =>
            axios.get(`${BASE_URL}/product-service/flashsale/products/${productId}`)
          )
        );
        const productsData = productsResponse.map((response) => response.data);
        setProducts(productsData);
        console.log("Products:", productsData);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [userInfo.id]);

  const deleteOrder = async (orderId) => {
    try {
      // 向后端发送删除订单的请求
      await axios.delete(`/api/orders/${orderId}`);
      // 重新获取订单历史
      navigate("/user/orders")
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


  return (
    <div>
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">product name</th>
                <th scope="col">Image</th>
                <th scope="col">price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const product = products.find(
                  (product) => product.productId === order.productId
                );

                return (
                  <tr key={order.id}>
                    <td>{product.productName}</td>
                    <td>
                      <img
                        className="card-img-top p-3"
                        src={product.img}
                        alt={product.productName}
                        style={{ width: '200px', height: '200px' }}
                      />
                    </td>
                    <td>{order.amount}</td>
                    <td>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete order history
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
