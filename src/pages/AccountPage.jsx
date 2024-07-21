import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Fetch user details if logged in
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5001/api/auth/login', formData);
        setUser(response.data);
      } else {
        const response = await axios.post('http://localhost:5001/api/auth/register', formData);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5001/api/auth/logout', {});
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="account-page">
      {user ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
          <h2>Your Favorite Products</h2>
          {/* Render user's favorite products here */}
          <ul>
            {user.favorites.products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
          <h2>Your Favorite Courses</h2>
          {/* Render user's favorite courses here */}
          <ul>
            {user.favorites.courses.map((course) => (
              <li key={course.id}>{course.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>{isLogin ? 'Login' : 'Create Account'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
          <button className="btn btn-secondary" onClick={toggleForm}>
            {isLogin ? 'Create an Account' : 'Already have an account? Login'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
