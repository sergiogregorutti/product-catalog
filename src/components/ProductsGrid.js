import React from 'react';
import Product from './Product';

const ProductsGrid = ({ products }) => {
  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
