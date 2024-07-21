import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="logo">ClubHouseHomie</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/account"><i className="fas fa-user"></i></Link></li>
          <li><Link to="/cart"><i className="fas fa-shopping-cart"></i></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

