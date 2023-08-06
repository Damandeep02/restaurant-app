import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListRestaurantPage.css'; // Make sure to import your CSS file
import {Link} from 'react-router-dom'

function ListRestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editContact, setEditContact] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    // Fetch the restaurant details for editing
    const restaurantToEdit = restaurants.find(restaurant => restaurant.id === id);
    setEditName(restaurantToEdit.name);
    setEditAddress(restaurantToEdit.address);
    setEditContact(restaurantToEdit.contact);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/restaurants/${id}`, {
        name: editName,
        address: editAddress,
        contact: editContact
      });
      setEditingId(null);
      fetchRestaurants();
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/restaurants/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditAddress('');
    setEditContact('');
  };

  return (
    <div className="list-restaurants-container">
        <div className="top-links">
        <Link to="/" className="home-link">Homepage</Link>
        <Link to="/add" className="add-link">Add Restaurants</Link>
        </div>
      <h1 className="title">A list of places where you can have a great time !!</h1>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="restaurant-item">
            {editingId === restaurant.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Restaurant Name"
                  className="edit-input"
                />
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="Restaurant Address"
                  className="edit-input"
                />
                <input
                  type="text"
                  value={editContact}
                  onChange={(e) => setEditContact(e.target.value)}
                  placeholder="Contact Information"
                  className="edit-input"
                />
                <div className="edit-buttons">
                  <button className="save-button" onClick={() => handleUpdate(restaurant.id)}>Save</button>
                  <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="restaurant-details">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-info">{restaurant.address}</p>
                <p className="restaurant-info">{restaurant.contact}</p>
                {restaurant.image && (
                  <img className="restaurant-image" src={restaurant.image} alt={restaurant.name} />
                )}
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(restaurant.id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(restaurant.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListRestaurantsPage;
