import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
    let navigate = useNavigate();

  const [product, setProduct] = useState({
        id: "",
        sellerId: "",
        name: "",
        img: "",
        detail: "",
        price: "",
        stock: "",
        saleStartTime: "",
        saleEndTime: ""
  }); 

  const { id, sellerId, name, img, detail, price, stock, saleStartTime, saleEndTime } = product;
  const onInputChange = async (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/product", product);
    navigate("/");
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
              <label htmlFor="id" className="form-label">
              product id
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter id"
                name="id"
                value={id}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sellerId" className="form-label">
              sellerId
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="sellerId"
                name="sellerId"
                value={sellerId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
              Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Image" className="form-label">
              Image
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Update image"
                name="img"
                value={img}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Detail" className="form-label">
              Detail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Detail of product"
                name="detail"
                value={detail}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
              price
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
              stock
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter stock"
                name="stock"
                value={stock}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="saleStartTime" className="form-label">
              saleStartTime
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter sale Start Time"
                name="saleStartTime"
                value={saleStartTime}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="saleEndTime" className="form-label">
              saleEndTime
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter sale End Time"
                name="saleEndTime"
                value={saleEndTime}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/products">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
