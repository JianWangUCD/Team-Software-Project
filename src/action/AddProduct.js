import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api";

export default function AddProduct() {
  let navigate = useNavigate();
  const [sellerId, setSellerId] = useState();
  const [productName, setProductName] = useState();
  const [img, setImg] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  // const [saleStartTime, setSaleStartTime] = useState();
  // const [saleEndTime, setSaleEndTime] = useState();
  
    // 返回获取的状态值获取登陆者id和role
  //获取登录成功后的用户信息
  const userInfo = useSelector(state => state.userLogin.userInfo);
  
  
  

  const onSubmit = async (e) => {
    e.preventDefault();

    

    const product = {
      sellerId:userInfo.id,
      productName,
      img,
      detail,
      price,
      stock,
      // saleStartTime,
      // saleEndTime,
    };

    await axios.post(`${BASE_URL}/product-service/flashsale/products` , product);
    navigate("/seller");
  };


  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>

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
                onChange={(e) => setProductName(e.target.value)}
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
                onChange={(e) => setImg(e.target.value)}
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
                onChange={(e) => setDetail(e.target.value)}
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="saleStartTime" className="form-label">
              saleStartTime
              </label>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Enter sale Start Time"
                name="saleStartTime"
                value={saleStartTime ? saleStartTime.toISOString().slice(0, 16) : ''}
                onChange={(e) => setSaleStartTime(e)}
                // onBlur={() => onTimeConfirm("saleStartTime", new Date(document.getElementsByName("saleStartTime")[0].value))}
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
                onChange={(e) => setSaleEndTime(e)}
                // onBlur={() => onTimeConfirm("saleEndTime", new Date(document.getElementsByName("saleEndTime")[0].value))}
                // value={saleEndTime}
                // onChange={(e) => onInputChange(e)}
              />
            </div> */}
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
