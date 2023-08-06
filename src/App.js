import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [imageFile, setImageFile] = useState(null);
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
      fetchRestaurants();
      setName('');
      setAddress('');
      setContact('');
      setImageFile(null);
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  }

  const handleUpdateRestaurant = async (id, newName, newAddress, newContact) => {
    try {
      await axios.put(`/restaurants/${id}`, { name: newName, address: newAddress, contact: newContact });
      fetchRestaurants();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`/restaurants/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Restaurant Listing Platform</Typography>
      <form onSubmit={handleAddRestaurant}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField label="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        <input type="file" onChange={handleImageChange} />
        <Button type="submit">Add Restaurant</Button>
      </form>
      <List>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
             {restaurant.image && (
              <img
                src={restaurant.image}
                alt={`Image of ${restaurant.name}`}
                style={{ maxWidth: '100px' }}
              />
            )}
            {editingId === restaurant.id ? (
              <>
                <TextField
                  label="Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <TextField
                  label="Address"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
                <TextField
                  label="Contact"
                  value={editContact}
                  onChange={(e) => setEditContact(e.target.value)}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleUpdateRestaurant(
                      restaurant.id,
                      editName,
                      editAddress,
                      editContact
                    )
                  }
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <ListItemText
                  primary={restaurant.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {restaurant.address}
                      </Typography>
                      <br />
                      {restaurant.contact}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => setEditingId(restaurant.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;