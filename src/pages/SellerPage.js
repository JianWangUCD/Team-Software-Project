import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../api";
import { useSelector } from "react-redux";
// import Navbar from '../component/Navbar'

export default function SellerPage() {

  // 返回获取的状态值
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  });

  const loadProducts = async () => {
    const result = await axios.get(`http://localhost:9000/product-service/flashsale/seller/${userInfo.id}/products`);
    setProducts(result.data);
  };

  const deleteProducts = async (id) => {
    await axios.delete(`${BASE_URL}/product-service/flashsale/products/${id}`);
    loadProducts();
  };

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
                <td>{product.saleStartTime}</td>
                <td>{product.saleEndTime}</td>
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
}
