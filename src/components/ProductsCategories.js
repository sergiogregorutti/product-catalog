import React from 'react';

const ProductsCategories = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="products-categories">
      <span>Categories:</span>
      {categories.map((category) => (
        <div key={category}>
          <button onClick={() => onCategoryClick(category)}>
            {category}
          </button>
          &nbsp;
          {selectedCategory === category ? (<button onClick={() => onCategoryClick(null)}>X</button>) : null}
        </div>
      ))}
    </div>
  );
};

export default ProductsCategories;
