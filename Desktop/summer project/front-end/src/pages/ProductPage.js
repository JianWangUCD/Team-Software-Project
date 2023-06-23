import React from 'react'
import data from '../data'
import { Link, useParams } from "react-router-dom";


export default function ProductPage(props) {
  const { id } = useParams();
  const product = data.products.find((x) => x.id === parseInt(id));
  if (!product){
    return <div> Product Not Found</div>;
  }
  return (
      <div >
        
        <div className="row top">
          <div className="col-2">
            <img className="large" src={product.img} alt={product.name} ></img>
          </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  price: {product.price}
                </li>
                <li>
                  <p>Detail: {product.detail}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <ul>
              <li>
                <div calssName = "row">
                  <div>Start</div>
                  <div>{product.saleStartTime}</div>
                </div>
                </li>
                <li>
                <div calssName = "row">
                  <div>Stock</div>
                  <div>{product.stock}</div>
                </div>
                </li>
                <li>
                  <button className = "primary block">
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Product = () => {
//   // const { product_id } = useParams();
//   const [products, setProducts] = useState(null);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
     
//       // const response = await axios.get("http://localhost:8080/products")
//       // setProducts(response.data);

//       const mockProducts = [
//         {
//           id: 1,
//           sellerID: 123,
//           name: 'Product 1',
//           img: 'https://example.com/product1.jpg',
//           detail: 'Product 1 details',
//           price: 19.99,
//           stock: 10,
//           saleStartTime: '2023-06-23 10:00:00',
//           saleEndTime: '2023-06-23 12:00:00',
//         },
//         {
//           id: 2,
//           sellerID: 456,
//           name: 'Product 2',
//           img: 'https://example.com/product2.jpg',
//           detail: 'Product 2 details',
//           price: 29.99,
//           stock: 5,
//           saleStartTime: '2023-06-24 14:00:00',
//           saleEndTime: '2023-06-24 16:00:00',
//         }
//         // 添加更多假数据...
//       ];

//       setProducts(mockProducts);
//   };

//   if (!products) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <h3>{product.name}</h3>
//             <p>Price: ${product.price}</p>
//             <p>Stock: {product.stock}</p>
//             <p>Sale Start Time: {product.saleStartTime}</p>
//             <p>Sale End Time: {product.saleEndTime}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Product;
