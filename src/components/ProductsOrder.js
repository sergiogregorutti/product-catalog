import React from 'react';

const ProductsOrder = ({ value, onChange }) => {
  return (
    <div className="products-order">
      <span>Order by:</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default ProductsOrder;