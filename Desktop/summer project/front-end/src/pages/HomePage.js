import React from 'react'
import Product from '../component/Product';
import data from '../data';
import Home from '../component/Home';

export default function HomePage() {
  return (
    <div>
      <Home />
      <div className="row center">
          {
            data.products.map((product) => (
             <Product key = {product.id} product = {product}></Product>
            ))
          }
      </div>
         </div>
  )
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('/products', {
//         method: 'GET',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setProducts(data);
//       } else {
//         console.error('Failed to fetch products');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to Flash Sale</h1>
//       <h2>Featured Products</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <a href={`/products/${product.id}`}>{product.name}</a>
//             <p>Price: ${product.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
