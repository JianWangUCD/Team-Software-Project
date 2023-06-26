import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import Navbar from '../component/Navbar'

export default function SellerPage() {
  const username = '111';
  const password = '111';

  const credentials = window.btoa(username + ':' + password);
  const headers = {
  'Authorization': 'Basic ' + credentials,
  'Content-Type': 'application/json'
};

  const [products, setProducts] = useState([]);


  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    // const result = await axios.get('http://localhost:8000/products');
    const result = await axios.get('http://localhost:8080/api/flashsale/products', { headers });
    setProducts(result.data);
  };

  const deleteProducts = async (id) => {
    // await axios.delete(`http://localhost:8000/product/${id}`);
    await axios.delete(`http://localhost:8080/api/flashsale/products/${id}`, { headers });
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
              <th scope="col">stock</th>
              <th scope="col">details</th>
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
                <td>{product.stock}</td>
                <td>{product.detail}</td>
                <td>
              
                  {/* <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editProduct/${product.id}`}
                  >
                    Edit
                  </Link> */}
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
