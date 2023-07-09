import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../action/authAction";
import MessageBox from "../component/MessageBox";
import LoadingBox from "../component/LoadingBox";

export default function LoginPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState(""); // 用于保存用户名字
    const [password, setPassword] = useState(""); // 用于保存密码
    
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    
    // 返回获取的状态值
    const userLogin = useSelector( state  => state.userLogin)
    const { loading, error, userInfo } = userLogin

  useEffect(() => {
    // 如果已经登陆，重新定向
    if(userInfo){
      navigate(redirect)}
  }, [navigate,userInfo, redirect])
    // 登陆函数
    
  const submitLogin = async (e) => {
        e.preventDefault();
        // 用dispatch来查询，获取登陆后的数据
        dispatch(login(username, password))
      };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        { error && <MessageBox>{error}</MessageBox>}
        { loading && <LoadingBox />}
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">username</label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="enter username"
                  id = "username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type={"text"}
                  class="form-control"
                  placeholder="Password"
                  id = "password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* 是否选择角色登陆，如果有两个表，有两个URL，需要选择角色，然后通过判断role使用不同的action */}
              {/* <div className="my-3">
                <label htmlFor="role">Role</label>
                <select
                  className="form-select"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                >

                  <option value="">Select role</option>
                  <option value="seller">seller</option>
                  <option value="customer">buyer</option>
                </select>
              </div> */}
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={submitLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import { Navigate } from 'react-router-dom';
// // import { useHistory } from 'react-router-dom';

// const API_BASE_URL = 'http://localhost:8080'; // 后端API的基本URL

// export default function LoginPage() {
//   // const history = useHistory();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // useEffect(() => {
//   //   // 检查本地存储中是否存在有效的token
//   //   const token = localStorage.getItem('token');
//   //   if (token) {
//   //     // 解码JWT
//   //     const decodedToken = jwt.decode(token);
//   //     if (decodedToken) {
//   //       const role = decodedToken.role;
//   //       // 在这里执行相应的逻辑，比如跳转到其他页面
//   //     } else {
//   //       // 无效的JWT，可以在这里清除本地存储中的token和role
//   //       localStorage.removeItem('token');
//   //       localStorage.removeItem('role');
//   //     }
//   //   }
//   // }, []);

  

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/users/login?username=${username}&password=${password}`);
//       const data = await response.json();
//       if (response.ok) {
//         const { token } = data;
//         // 解码JWT
//         const decodedToken = jwt.decode(token);
        

//         if (decodedToken) {
//           // 从JWT中读取role
//           const role = decodedToken.role;
//           const id = decodedToken.id;
          
//           // 保存token和role到本地存储
//           localStorage.setItem('token', token);
//           localStorage.setItem('role', role);

//           // 如果饿角色为seller
//           if (role === 'seller') {
//             // 获取sellerid
//             // 跳转到 SellerPage 页面
//             Navigate(`/sellerpage`)
//           } else {
//             Navigate(`/`)
//           }
//         } else {
//           setErrorMessage('无效的JWT');
//         }
//       } else {
//         setErrorMessage(data.error);
//       }
//     } catch (error) {
//       console.error('登录失败:', error);
//       setErrorMessage('登录失败');
//     }
//   };

//     return (
//       <div>
//         <h2>登录</h2>
//         <div>
//           <label>用户名:</label>
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         <div>
//           <label>密码:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         {errorMessage && <div>{errorMessage}</div>}
//         <button onClick={handleLogin}>登录</button>
//       </div>
//     );
//   }