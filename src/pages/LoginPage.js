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
    const redirect = location.state?.from || "/";

    
    // 返回获取的状态值
    const userLogin = useSelector( state  => state.userLogin)
    const { loading, error, userInfo } = userLogin

  useEffect(() => {
    // 如果已经登陆，重新定向
    if(userInfo && userInfo.role === "buyer"){
      navigate(redirect)} 
      if (userInfo && userInfo.role === "seller"){
        navigate("/seller")
      }
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
