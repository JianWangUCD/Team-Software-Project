import React from 'react';
import { format } from 'date-fns';

export default function Product({ product }) {
  // const {product} = props;
   
  
  return (
      <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
        <div className="card text-center h-100" key={product.id}>
        <a href={`/product/${product.id}`}>
                  <img className="card-img-top p-3" src={product.img} alt={product.productName} height={300} />
                </a>
                <div className="card-body">
                  <h5 className="card-title">
                  <a href={`/product/${product.id}`}>
                    {product.productName}
                  </a>
                  </h5>
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  <li className="list-group-item lead">
                    sale start: {format(new Date(product.saleStartTime), 'yyyy-MM-dd HH:mm:ss')}
                  </li>
                  <li className="list-group-item lead">
                    sale end: {format(new Date(product.saleEndTime), 'yyyy-MM-dd HH:mm:ss')}
                  </li>
                </ul>
                  
                </div>
                
              </div>
        </div>
                
  )
}
