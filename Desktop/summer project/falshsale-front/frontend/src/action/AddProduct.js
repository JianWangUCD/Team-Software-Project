import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {

//   const username = '111';
//   const password = '111';

//   const credentials = window.btoa(username + ':' + password);
//   const headers = {
//   'Authorization': 'Basic ' + credentials,
//   'Content-Type': 'application/json'
// };
    let navigate = useNavigate();

  const [product, setProduct] = useState({
        id: "",
        sellerId: "",
        productName: "",
        img: "",
        detail: "",
        price: "",
        stock: "",
        saleStartTime: "",
        saleEndTime: ""
  }); 

  const { id, sellerId, productName, img, detail, price, stock, saleStartTime, saleEndTime } = product;
  const onInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "id" || name === "sellerId" || name === "stock") {
      setProduct({ ...product, [name]: parseInt(value) });
    } else if (name === "price") {
      setProduct({ ...product, [name]: parseFloat(value) });
    } else if (name === "saleStartTime" || name === "saleEndTime") {
      setProduct({ ...product, [name]: new Date(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
    // setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onTimeConfirm = (name, value) => {
    setProduct({ ...product, [name]: value });
  };
  
  

  const onSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:8000/product", product);
    await axios.post("http://localhost:8080/api/flashsale/products" , product);
    navigate("/products");
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
              <label htmlFor="productName" className="form-label">
              Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product name"
                name="productName"
                value={productName}
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
                type="datetime-local"
                className="form-control"
                placeholder="Enter sale Start Time"
                name="saleStartTime"
                value={saleStartTime ? saleStartTime.toISOString().slice(0, 16) : ''}
                onChange={(e) => onInputChange(e)}
                onBlur={() => onTimeConfirm("saleStartTime", new Date(document.getElementsByName("saleStartTime")[0].value))}
                // value={saleStartTime}
                // onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="saleEndTime" className="form-label">
              saleEndTime
              </label>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Enter sale End Time"
                name="saleEndTime"
                value={saleEndTime ? saleEndTime.toISOString().slice(0, 16) : ''}
                onChange={(e) => onInputChange(e)}
                onBlur={() => onTimeConfirm("saleEndTime", new Date(document.getElementsByName("saleEndTime")[0].value))}
                // value={saleEndTime}
                // onChange={(e) => onInputChange(e)}
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
