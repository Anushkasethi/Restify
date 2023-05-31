// PropertyPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PropertyPage.css';
import Comments from './components/Comments';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PropertyPage = () => {
  const navigate = useNavigate();
  const handlePageClick = () => {
    navigate(`/reservationForm`);
  }



  const [property, setProperty] = useState([]);
  const params = useParams();
  const prop_id = params.prop_id;
  useEffect(() => {
    const getPropertyData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8000/property/property/${prop_id}/`, {
             headers: {
                'Authorization': "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTI4OTk4LCJpYXQiOjE2ODIzMzY5OTgsImp0aSI6IjkzY2NiMGQ5YjZkZTQ1MzI4MzM2NjIxZGYyNTI4ZDQ2IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJzYXNhbiJ9.48NWjioib4FyEuzjsysbdut4zanI3I9aWf03991Qs0c",
                'Content-Type': 'application/json',
              },
        }); // Replace with your API URL and property ID
        console.log('Response data:', response.data);
        const [property] = response.data;
        setProperty(property);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    getPropertyData();
  }, []);

  if (property) {
    return (
      <div className="property-container">
        <div className="property-card">

          <h1>{property.description}</h1>
          {console.log(property.description)}
          {property.cover_image && <img src={`http://localhost:8000${property.cover_image}`} alt={property.description} />}
          {property.cover_image && <img src={`http://localhost:8000${property.front_image}`} alt={property.description} />}
          {property.cover_image && <img src={`http://localhost:8000${property.back_image}`} alt={property.description} />}
          <p>{property.description}</p>
          <p>Type: {property.prop_type}</p>
          <p>Address: {property.address}</p>
          <p>Rooms: {property.rooms}</p>
          <p>Baths: {property.baths}</p>
          <p>Parking: {property.parking}</p>
          <p>Max Guests: {property.max_guests}</p>
          <p>Available: {property.is_available ? 'Yes' : 'No'}</p>
          <p>First Day Available: {property.first_day_available}</p>
          <p>Rate: ${property.rate}</p>
          <button className="reserve-button" onClick={handlePageClick}>Reserve</button>
        </div>
        <Comments prop_id={property.id} />
      </div>
    );
  }
  
  return <div>Loading...</div>;
};

export default PropertyPage;
