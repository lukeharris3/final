import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
import CoursesPage from "./pages/CoursesPage";
import SingleCoursePage from "./pages/SingleCoursePage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage"; // Import AccountPage
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/main.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} /> {/* Add AccountPage route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
