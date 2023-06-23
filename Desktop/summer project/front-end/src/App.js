import React from 'react';

import './App.css';
// import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

import Navbar from './component/Navbar';
import Home from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
      <Navbar />
        {/* <header className="row">
          <div>
            <a className="brand" href="/">
              Falsh Sale
            </a>
          </div>
          <div>
            <a href="/login">Login</a>
            <a href="/signin">Sign In</a>
          </div>
        </header> */}
        <main>
          <Routes>
            <Route path="/product/:id" Component={ProductPage} exact></Route>
            <Route path="/" Component={HomePage} exact></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
