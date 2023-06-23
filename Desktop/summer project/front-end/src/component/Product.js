import React from 'react'

export default function Product(props) {
  const {product} = props;
    return (

      <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
        <div className="card text-center h-100" key={product.id}>
        <a href={`/product/${product.id}`}>
                  <img className="card-img-top p-3" src={product.img} alt={product.name} height={300} />
                </a>
                <div className="card-body">
                  <h5 className="card-title">
                  <a href={`/product/${product.id}`}>
                    {product.name}
                  </a>
                  </h5>
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  <li className="list-group-item lead">sale time: {product.saleStartTime} - {product.saleStartTime}</li>
                </ul>
                  
                </div>
                
              </div>
        </div>
                
  )
}
