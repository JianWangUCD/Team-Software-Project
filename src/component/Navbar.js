import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom';
import { logout } from '../action/authAction';

import { Container, NavDropdown, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';

function Navbar() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  //退出函数
  const logoutHandler = () => {
    dispatch(logout());
  };

  if (userInfo && userInfo.role === "seller") 
  return (
    <div>
      <BootstrapNavbar bg="light" expand="lg" sticky="top" className="py-3" 
                collapseOnSelect>
        <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" className="fw-bold fs-3 px-2">
          Flash Sale
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Item>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link"  to="/products">
                All Products
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink className="nav-link" to="/seller">
              My products
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink className="nav-link" to="/addProduct">
                Upload Products
              </NavLink>
            </Nav.Item>
          </Nav>
          
          {/* 右侧导航 */}
          <div className="ml-auto" id="basic-navbar-nav">
            <NavDropdown className='' title={<span><i className="fa fa-user mr-3"></i>{userInfo.username}</span>} id='username'>
            <NavDropdown.Item>
           
            <Nav.Item>
            <NavLink className="nav-link" onClick={logoutHandler}>
                   Logout
                 </NavLink>
            </Nav.Item>
              </NavDropdown.Item>
          </NavDropdown>
      
          </div>
        </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      </div>
  ) 

  if (userInfo && userInfo.role === "admin") 
  return (
    <div>
<BootstrapNavbar bg="light" expand="lg" sticky="top" className="py-3" 
                collapseOnSelect>
        <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" className="fw-bold fs-3 px-2">
          Flash Sale
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Item>
              <NavLink className="nav-link"  to="/">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link"  to="/products">
                Products
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link"  to="/admin">
              Manage users
              </NavLink>
            </Nav.Item>
          </Nav>
          
          {/* 右侧导航 */}
          <div className="ml-auto" id="basic-navbar-nav">
            <NavDropdown className='' title={<span><i className="fa fa-user mr-3"></i>{userInfo.username}</span>} id='username'>
            <NavDropdown.Item>
            <Nav.Item>
            <NavLink className="nav-link" onClick={logoutHandler}>
                   Logout
                 </NavLink>
            </Nav.Item>
              </NavDropdown.Item>
          </NavDropdown>
      
          </div>
        </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      </div>
  ) 

  return (
    <div>
      <BootstrapNavbar bg="light" expand="lg" sticky="top" className="py-3" 
                collapseOnSelect>
        <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" className="fw-bold fs-3 px-2">
          Flash Sale
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Item>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/todaysSale">
                Sale Soon
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/saleNow">
                Sale Now
              </NavLink>
            </Nav.Item>
          </Nav>
          
          {/* 右侧导航 */}
          <div className="ml-auto">
          {userInfo && userInfo.role === 'buyer' ? (
            <NavDropdown className='' title={<span><i className="fa fa-user mr-3"></i>{userInfo.username}</span>} id='username'>
            <NavDropdown.Item>
                <NavLink className="nav-link" to="/user/orders">
                  My orders
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink className="nav-link" onClick={logoutHandler}>
                  Logout
                </NavLink>
              </NavDropdown.Item>
          </NavDropdown>
           ) : (
            <Nav className='ml-auto'>
            <Nav.Item>
                <NavLink className="nav-link" to="/login">
                <i className="fa fa-sign-in-alt mr-1"></i>
                   Login
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/register">
                <i className="fa fa-user-plus mr-1"></i>
                   Register
                </NavLink>
              </Nav.Item>
          </Nav>
          )}
          </div>
        </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
}

export default Navbar;
