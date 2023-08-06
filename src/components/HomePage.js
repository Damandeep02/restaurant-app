import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="title" color='#0697f1'>Welcome to the Restaurant Listing Platform</h1>
      <div className="button-container">
        <Link to="/add" className="button add-button">
          Add Restaurant
        </Link>
        <Link to="/list" className="button add-button">
          Restaurants List
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
