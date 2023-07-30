
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';
import { format } from 'date-fns';
import useAxiosWithAuth from '../useAxiosWithAuth';

// 等待Orders修改
export default function BuyerOrders() {
  const axios = useAxiosWithAuth();

  const navigate = useNavigate();
  // 返回获取的状态值
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [orders, setOrders] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const ordersResponse = await axios.get(
        `/order-service/flashsale/user/${userInfo.id}/orders`
      );
      const ordersData = ordersResponse.data;
      setOrders(ordersData);
      console.log("Orders:", ordersData);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [userInfo.id]);

  const deleteOrder = async (orderId) => {
    try {
      // 向后端发送删除订单的请求
      await axios.delete(`/order-service/flashsale/orders/${orderId}`);
      // 重新获取订单历史
      fetchOrderHistory();
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
                <th scope="col"></th>
                <th scope="col">price</th>
                <th scope="col">order time</th>

              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {

                return (
                  <tr key={order.id}>
                    <td>{order.productName}</td>
                    <td>
                      <img
                        className="card-img-top p-3"
                        src={order.img}
                        alt={order.productName}
                        style={{ width: '150px', height: '150px' }}
                      />
                    </td>
                    <td>{order.amount}</td>
                    <td>{format(new Date(order.orderTime), 'yyyy-MM-dd HH:mm:ss')}</td>
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
