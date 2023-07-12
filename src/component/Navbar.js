import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom';
import { logout } from '../action/authAction';

function Navbar() {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    //退出函数
    const logoutHandler = () => {
    dispatch(logout())
  }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-3 px-2" to="/"> Flash Sale</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">Products</NavLink>
                        </li>
                    </ul>
                    { userInfo ? (
                        <div className="buttons text-center">

                            <button>{userInfo.username}</button>
                            
                        <button onClick={logoutHandler}>logout</button>
                  </div>
                    ) : (
                        <div className="buttons text-center">
                        <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                    </div>
                    
                )}
                    {userInfo && userInfo.role === "seller" && (
                    <div className="buttons text-center">
                        <NavLink to="/addProduct" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> addProduct</NavLink>
                        <NavLink to="/seller" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> seller</NavLink>
                    </div>
              )}
                </div>
            </div>
        </nav>
        </div>
        
    );
}

export default Navbar