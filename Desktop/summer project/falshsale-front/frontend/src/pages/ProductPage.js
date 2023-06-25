import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import data from '../data'
import { useParams } from "react-router-dom";


export default function ProductPage(props) {
  // const { id } = useParams();
  
  // const product = data.products.find((x) => x.id === parseInt(id));
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${id}`);
        // const response = await axios.get(`http://localhost:8080/flashsale/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product){
    return <div> Product Not Found</div>;
  }
  return (

    <div className="container my-5 py-2">
    <div className="row">
      <div className="col-md-6 col-sm-12 py-3">
        <img
          className="img-fluid"
          src={product.img} alt={product.name}
          width="400px"
          height="400px"
        />
      </div>
      <div className="col-md-6 col-md-6 py-5">
        <h4 className="text-uppercase text-muted">catogory</h4>
        <h1 className="display-5">{product.name}</h1>
        {/* <p className="lead">
          {product.rating && product.rating.rate}{" "}
          <i className="fa fa-star"></i>
        </p> */}
        <h3 className="display-6  my-4">${product.price}</h3>
        <p className="lead">{product.detail}</p>
        <h3 className="display-6  my-4">Sale Start: {product.saleStartTime}</h3>
        <button
          className="btn btn-outline-dark"
          // onClick={() => addProduct(product)}
        >
          Checkout
        </button>
        {/* <Link to="/cart" className="btn btn-dark mx-3">
          Go to Cart
        </Link> */}
      </div>
    </div>
  </div>
  );
}
