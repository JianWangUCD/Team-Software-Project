import React from 'react';

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

import Navbar from './component/Navbar';
import RequireAuth from './component/RequireAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import SellerPage from './pages/SellerPage';
import AddProduct from './action/AddProduct';
import RegisterPage from './pages/RegisterPage';
import ManageProduct from './action/ManageProduct';
import SellerOrders from './pages/SellerOrders';
import checkout from './pages/checkout';
import BuyerOrders from './pages/BuyerOrders';
import Footer from './component/Footer';
import LoginPage from './pages/LoginPage';



function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
      <Navbar />
        <main>
          <Routes>
            {/* public route */}
            <Route path="/" Component={HomePage} exact></Route>
            <Route  path="/login" Component={LoginPage} exact/>
            <Route  path="/register" Component={RegisterPage} exact/>
            <Route path="/product/:id" Component={ProductPage} exact></Route>
            <Route path="/products" Component={ProductsPage} exact></Route>

            {/* accessed by seller */}
            <Route element = {<RequireAuth />}>
              <Route path="/seller/:id" Component={SellerPage} exact></Route>
              <Route path="/addProduct" Component={AddProduct} exact/>
              <Route path="/editProduct" Component={ManageProduct} exact></Route>
              <Route path="/seller/:id/viewOrders" Component={SellerOrders} exact></Route>
            </Route>

            {/* accessed by buyer */}
            <Route element = {<RequireAuth />}>
              <Route exact path="/checkout" Component={checkout} />
              <Route exact path="/user/orders" Component={BuyerOrders} />
            </Route>
            
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
