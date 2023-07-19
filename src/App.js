import React from 'react';

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import SellerPage from './pages/SellerPage';
import AddProduct from './action/AddProduct';
import RegisterPage from './pages/RegisterPage';
import SellerEdit from './pages/SellerEdit';
import checkout from './pages/CheckoutPage';
import BuyerOrders from './pages/BuyerOrders';
import Footer from './component/Footer';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import TodaysSale from './pages/TodaysSale';



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
            <Route path="/todaysSale" Component={TodaysSale} exact></Route>

            {/* accessed by seller */}
              <Route path="/seller" Component={SellerPage} exact></Route>
              <Route path="/editProduct/:id" Component={SellerEdit} exact></Route>
              <Route path="/addProduct" Component={AddProduct} exact/>
              <Route path="/seller/:id/viewOrders" Component={SellerEdit} exact></Route>
            
            {/* accessed by buyer */}
              <Route exact path="/checkout" Component={CheckoutPage} />
              <Route exact path="/user/orders" Component={BuyerOrders} />
            
            
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
