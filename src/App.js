import React, { useState, useEffect } from 'react';

import ProductsGrid from './components/ProductsGrid';
import ProductsCategories from './components/ProductsCategories';
import ProductsOrder from './components/ProductsOrder';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts(page, order, category);
  }, [page]);

  const fetchProducts = async (page, order, category) => {
    try {
      setLoading(true);
      let categoryFilter = '';
      if (category !== null) categoryFilter = `/category/${category}`;

      const response = await fetch(`https://fakestoreapi.com/products${categoryFilter}?page=${page}&sort=${order}`);
      const products = await response.json();

      if (page === 1) {
        setProducts(products);
      } else {
        setProducts((prev) => [...prev, ...products]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    if (page === 1) {
      fetchProducts(1, order, category);
    } else {
      setPage(1);
    }
    setCategory(category);

  };

  const handleSortChange = (order) => {
    if (page === 1) {
      fetchProducts(1, order, category);
    } else {
      setPage(1);
    }
    setOrder(order);
  };

  useEffect(() => {
    const onscroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const threshold = 300;
      const isReachBottom =
        document.body.scrollHeight - threshold <= scrolledTo;
      if (isReachBottom && !loading) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, [loading]);

  return (
    <div className="product-catalog">
      <div className="container">
        <h1>Product catalog</h1>

        <div className="main-content">
          <aside>
            <ProductsOrder value={order} onChange={handleSortChange} />
            <ProductsCategories categories={categories} selectedCategory={category} onCategoryClick={handleCategoryClick} />
          </aside>
          <section>
            <ProductsGrid products={products} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
