import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PropertyPage from '../PropertyPage';

const PropertyCard = ({ property }) => {

  const navigate = useNavigate();
  const property_id = property.id;
  const handlePageClick = () => {
    navigate(`/PropertyPage/${property_id}`);
  }

  return (
    <div className="property-card">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={property.cover_image}
          alt="Cover image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {property.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.description}
          </Typography>
          <p>Rooms: {property.rooms}</p>
          <p>Bathrooms: {property.baths}</p>
          <p>Parking: {property.parking}</p>
          <p>id: {property.id}</p>
        </CardContent>
        <CardActions>
          <Button size="small">Reserve</Button>
          <Button size="small" onClick={handlePageClick}>Details</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PropertyCard;