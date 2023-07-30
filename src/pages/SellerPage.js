import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../api";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import useAxiosWithAuth from "../useAxiosWithAuth";
import MessageBox from "../component/MessageBox";

export default function SellerPage() {

  const axios = useAxiosWithAuth();

  // 返回获取的状态值
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
}, []); // 空数组作为依赖项

  const loadProducts = async () => {
    const result = await axios.get(`/product-service/seller/${userInfo.id}/products`);
    setProducts(result.data);
  };

  const deleteProducts = async (id) => {
    await axios.delete(`/product-service/seller/products/${id}`);
    loadProducts();
  };

  if(!(userInfo.role === "seller" || userInfo.role === "admin")){
    return <MessageBox>"You are not seller"</MessageBox>
  }else{
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">price</th>
              <th scope="col">stock</th>
              <th scope="col">details</th>
              <th scope="col">sale start</th>
              <th scope="col">sale end</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <td>{product.productName}</td>
                <td>
                <img className="card-img-top p-3" src={product.img} alt={product.productName} style={{ width: '200px', height: '200px' }}/>
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.detail}</td>
                <td>{format(new Date(product.saleStartTime), 'yyyy-MM-dd HH:mm:ss')}</td>
                <td>{format(new Date(product.saleEndTime), 'yyyy-MM-dd HH:mm:ss')}</td>
                <td>
              
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editProduct/${product.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteProducts(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}}
