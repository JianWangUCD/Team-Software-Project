import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { useNavigate, useParams } from "react-router-dom";
import useAxiosWithAuth from "../useAxiosWithAuth";

const SellerEdit = () => {

  const axios = useAxiosWithAuth();
  let navigate = useNavigate();

  // const [startTimeError, setStartTimeError] = useState("");
  // const [endTimeError, setEndTimeError] = useState("");
  // const [priceError, setPriceError] = useState("");
  // const [stockError, setStockError] = useState("");
  
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

  const [errors, setErrors] = useState({
    price: "",
    stock: "",
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
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (isNaN(product.price) || Number(product.price) <= 0) {
      validationErrors.price = "Invalid price number";
    }

    if (isNaN(product.stock) || !Number.isInteger(Number(product.stock)) || Number(product.stock) <= 0) {
      validationErrors.stock = "Invalid stock number";
    }

    const startTime = new Date(product.saleStartTime);
    const endTime = new Date(product.saleEndTime);
  
    if (startTime <= new Date()) {
      validationErrors.saleStartTime = "Start time must be in the future";
    }
  
    if (endTime <= startTime) {
      validationErrors.saleEndTime = "End time must be later than start time";
    }
  
    
    // Display error messages if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


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
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
           {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
          {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
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
            className={`form-control ${errors.saleStartTime ? "is-invalid" : ""}`}
            id="saleStartTime"
            name="saleStartTime"
            value={product.saleStartTime}
            onChange={handleChange}
          />
          {errors.saleStartTime && <div className="invalid-feedback">{errors.saleStartTime}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="saleEndTime" className="form-label">
            Sale End Time
          </label>
          <input
            type="datetime-local"
            className={`form-control ${errors.saleEndTime ? "is-invalid" : ""}`}
            id="saleEndTime"
            name="saleEndTime"
            value={product.saleEndTime}
            onChange={handleChange}
          />
          {errors.saleEndTime && <div className="invalid-feedback">{errors.saleEndTime}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SellerEdit;
