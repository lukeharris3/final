import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/main.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data);
        console.log('Fetched products:', response.data);
        response.data.forEach(product => {
          console.log('Product price type:', typeof product.price, product.price);
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (product.brand_name && product.brand_name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (product.name && product.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (product.category && product.category.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  console.log('Filtered products:', filteredProducts);

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-info">
              <div className="product-card">
                <img src={product.image_url} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h4 className="product-brand">{product.brand_name}</h4>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
