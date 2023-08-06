import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AddRestaurantPage.css';

function AddRestaurantPage() {
  const history = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddRestaurant = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('contact', contact);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.post('/restaurants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFeedbackMessage('Restaurant added successfully');
      setErrorMessage(null);

      history('/list');
    } catch (error) {
      console.error('Error adding restaurant:', error);
      setErrorMessage('Unable to add restaurant');
      setFeedbackMessage(null);
    }
  };

  return (
    <div className="add-restaurant-container">
      <h1 className="title">Add New Restaurant</h1>
      {feedbackMessage && <p className="feedback-message success">{feedbackMessage}</p>}
      {errorMessage && <p className="feedback-message error">{errorMessage}</p>}
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Restaurant Name"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Restaurant Address"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Information"
        />
        <label className="file-label">
          <span className="file-label-text">Choose an Image</span>
          <input type="file" onChange={handleImageChange} />
        </label>
      </div>
      <button className="add-button" onClick={handleAddRestaurant}>
        Add Restaurant
      </button>
      <div className="link-container">
        <Link to="/" className="link">Homepage</Link>
        <Link to="/list" className="link">List Restaurants</Link>
      </div>
    </div>
  );
}

export default AddRestaurantPage;
