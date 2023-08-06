import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomePage from './components/HomePage';
import AddRestaurantPage from './components/AddRestaurantPage';
import ListRestaurantsPage from './components/ListRestaurantsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/add" element={<AddRestaurantPage/>} />
        <Route path="/list" element={<ListRestaurantsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
