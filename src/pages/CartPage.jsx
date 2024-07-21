import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/main.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image_url} alt={item.name} className="cart-item-image" />
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>{item.brand_name}</p>
            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
            <button className="btn-remove" onClick={() => handleRemove(item.id)}>
              <i className="fas fa-trash"></i>
            </button>
            <div className="quantity-selector">
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                name="quantity"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <div className="back-to-products">
          <button className="btn-back-to-products" onClick={handleBackClick}>
            Back to Products
          </button>
        </div>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartPage;

