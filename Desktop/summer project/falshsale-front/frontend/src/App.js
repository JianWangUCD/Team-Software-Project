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


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
      <Navbar />
        <main>
          <Routes>
          <Route exact path="/addProduct" Component={AddProduct} />
          <Route path="/seller" Component={SellerPage} exact></Route>
            <Route path="/product/:id" Component={ProductPage} exact></Route>
            <Route path="/products" Component={ProductsPage} exact></Route>
            <Route path="/" Component={HomePage} exact></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
