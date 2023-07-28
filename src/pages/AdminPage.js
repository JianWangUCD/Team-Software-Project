import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../api";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import MessageBox from "../component/MessageBox";

export default function AdminPage() {

  // 返回获取的状态值
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    loadUsers();
}, []); // 空数组作为依赖项

  const loadUsers = async () => {
    const result = await axios.get(`${BASE_URL}/user-service/flashsale/users`);
    const users = result.data;
    const buyersArray = users.filter(user => user.role === 'buyer');
    const sellersArray = users.filter(user => user.role === 'seller');
    setBuyers(buyersArray);
    setSellers(sellersArray);
  };

  const deleteUsers = async (id) => {
    await axios.delete(`${BASE_URL}/user-service/flashsale/users/${id}`);
    await axios.delete(`${BASE_URL}/product-service/flashsale/seller/${id}/products`);
    loadUsers();
  };

  if(!(userInfo.role === "admin")){
    return <MessageBox>"You are not admin"</MessageBox>
  }else{
    return (
        // <div className="container">
        //   <div className="py-4">
        //     <table className="table border shadow">
        //       <thead>
        //         <tr>
        //           <th scope="col">user name</th>
        //           <th scope="col">role</th>
        //           <th scope="col"></th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {users.map((user) => (
        //           <tr>
        //             <td>{user.username}</td>
        //             <td>{user.role}</td>
                
        //             <td>
        //               <button
        //                 className="btn btn-danger mx-2"
        //                 onClick={() => deleteUsers(user.id)}
        //               >
        //                 Delete
        //               </button>
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //   </div>
        // </div>

        <div className="container">
        <div className="py-4">
          <h2>Buyers</h2>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td>{buyer.username}</td>
                  <td>{buyer.role}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUsers(buyer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Sellers</h2>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller.id}>
                  <td>{seller.username}</td>
                  <td>{seller.role}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUsers(seller.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      );
    }
  }

  
