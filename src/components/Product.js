import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="content">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
