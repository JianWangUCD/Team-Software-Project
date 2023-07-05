import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../action/authAction";

export default function LoginPage() {

    const [role, setRole] = useState(""); // 用于保存选中的角色
    const [username, setUsername] = useState(""); // 用于保存用户名字
    const [password, setPassword] = useState(""); // 用于保存密码
  //   const dispatch = useDispatch

  //   const userLogin = useSelector( state  => state.userLogin)
  //   const { loading, error, userInfo } = userLogin
  const handleRoleChange = (e) => {
    setRole(e.target.value); // 更新选中的角色
  };

  // useEffect(() => {
  //   if(userInfo && role){

  //   }
  // })
    // 登陆函数
    const submitLogin = async (e) => {
        e.preventDefault();
        
        const path = "/api/" + role + "/login" 
    
        // 发送登录请求，获取Token
        const response = await fetch(path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
          const { token } = await response.json();
    
          // 将Token保存到本地存储
          localStorage.setItem("token", token);
    
          // 登录成功后的其他操作
          // 可以跳转到其他页面或执行其他逻辑
        } else {
          // 登录失败处理
        }
      };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">username</label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="enter username"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
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
              </div>
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

// import { useRef, useState, useEffect } from 'react';
// import useAuth from '../hooks/useAuth';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// import axios from '../api/axios';
// const LOGIN_URL = '/auth';

// const Login = () => {
//     const { setAuth } = useAuth();

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(LOGIN_URL,
//                 JSON.stringify({ user, pwd }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             console.log(JSON.stringify(response?.data));
//             //console.log(JSON.stringify(response));
//             const accessToken = response?.data?.accessToken;
//             const roles = response?.data?.roles;
//             setAuth({ user, pwd, roles, accessToken });
//             setUser('');
//             setPwd('');
//             navigate(from, { replace: true });
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 400) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             errRef.current.focus();
//         }
//     }

//     return (

//         <section>
//             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     ref={userRef}
//                     autoComplete="off"
//                     onChange={(e) => setUser(e.target.value)}
//                     value={user}
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     onChange={(e) => setPwd(e.target.value)}
//                     value={pwd}
//                     required
//                 />
//                 <button>Sign In</button>
//             </form>
//             <p>
//                 Need an Account?<br />
//                 <span className="line">
//                     <Link to="/register">Sign Up</Link>
//                 </span>
//             </p>
//         </section>

//     )
// }

// export default Login
