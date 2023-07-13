
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function BuyerOrders() {

  const navigate = useNavigate();
  // 返回获取的状态值
  const userLogin = useSelector( state  => state.userLogin)
  const { userInfo } = userLogin

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        // 获取用户订单
        const ordersResponse = await axios.get(`/api/Orders/user/${userInfo.id}`);
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        // 提取产品ID
        const productIds = ordersData.map((order) => order.productId);

        // 根据产品ID获取产品信息
        const productsResponse = await Promise.all(
          productIds.map((productId) => axios.get(`/api/products/${productId}`))
        );
        const productsData = await Promise.all(
          productsResponse.map((response) => response.json())
        );
        setProducts(productsData);
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
              // 根据订单中的产品ID查找对应产品名称
              const product = products.find(
                (product) => product.productId === order.productId
              );
              <tr>
                <td>{product.productName}</td>
                <td>
                <img className="card-img-top p-3" src={product.img} alt={product.productName} style={{ width: '200px', height: '200px' }}/>
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
          })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}
