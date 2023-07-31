import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api";
import useAxiosWithAuth from "../useAxiosWithAuth";

const SellerEdit = () => {

  const axios = useAxiosWithAuth();
  let navigate = useNavigate();
  
  const { id } = useParams();

  const [product, setProduct] = useState({
    productName: "",
    img: "",
    price: "",
    stock: "",
    detail: "",
    saleStartTime: "",
    saleEndTime: ""
  });

  

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const response = await axios.get(`/product-service/flashsale/products/${id}`);
    // const product = response.data;
    setProduct(response.data);
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   await axios.put(`${BASE_URL}/product-service/flashsale/products/${id}`, product);
  //   // 在更新后导航回SellerPage页面或其他适当的操作
  //   navigate("/seller");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedSaleStartTime = format(new Date(product.saleStartTime), "yyyy-MM-dd'T'HH:mm:ss");
  const formattedSaleEndTime = format(new Date(product.saleEndTime), "yyyy-MM-dd'T'HH:mm:ss");

  const updatedProduct = {
    ...product,
    saleStartTime: formattedSaleStartTime,
    saleEndTime: formattedSaleEndTime
  };

    await axios.put(`/product-service/seller/products/${id}`, updatedProduct);
    navigate("/seller");
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <div>
      <img className="img-fluid" src={product.img} alt={product.productName} width="200px"
            height="400px" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            // onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="img" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="img"
            name="img"
            value={product.img}
            onChange={handleChange}
            // onChange={(e) => setImg(e.target.value)}
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            // onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            className="form-control"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="detail" className="form-label">
            Detail
          </label>
          <input
            type="text"
            className="form-control"
            id="detail"
            name="detail"
            value={product.detail}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="saleStartTime" className="form-label">
            Sale Start Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="saleStartTime"
            name="saleStartTime"
            value={product.saleStartTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="saleEndTime" className="form-label">
            Sale End Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="saleEndTime"
            name="saleEndTime"
            value={product.saleEndTime}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SellerEdit;
