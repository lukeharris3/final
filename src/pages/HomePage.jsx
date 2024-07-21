import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ClubHouseHomie</h1>
        <p>Your ultimate Utah Golf destination.</p>
      </div>
      <div className="features">
        <Link to="/courses" className="feature-box">
          <div className="feature">
            <h3>Explore Courses</h3>
            <p>Discover the best golf courses in Utah</p>
          </div>
        </Link>
        <Link to="/products" className="feature-box">
          <div className="feature">
            <h3>Shop the store</h3>
            <p>Get the latest gear from top golf companies.</p>
          </div>
        </Link>
        <Link to="/blog" className="feature-box">
          <div className="feature">
            <h3>ClubHouse Talk</h3>
            <p>Stay in the loop for everything happening in Golf!</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
