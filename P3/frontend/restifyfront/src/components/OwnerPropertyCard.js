import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

const OwnerPropertyCard = ({ property, onPropertyDeleted }) => {
  const navigate = useNavigate();
  const property_id = property.id;
  const [open, setOpen] = React.useState(false);

  const handleChangeClick = () => {
    navigate(`/propertyChangeForm/${property_id}`);
  };

  const handlePageClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/property/property/${property_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0ODk2MDY1LCJpYXQiOjE2ODIzMDQwNjUsImp0aSI6ImQxZmY2NzlkOGU1ODRhMGE4MWMwMDNmMmIyOGU2ZWE5IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJzYXNhbjIifQ.kMaq7WhYSQRNlaIygTqXg8Ghwg9xKDTPkC8Ps_xBeCY',
        },
      });

      // Handle the response or do something after the successful deletion.
      onPropertyDeleted && onPropertyDeleted();
    } catch (error) {
      console.error('Error deleting the property:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcknowledge = () => {
    handlePageClick();
    setOpen(false);
  };

  return (
    <div className="property-card">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" image={property.cover_image} />
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
          <Button size="small" onClick={handleChangeClick} style={{ backgroundColor: 'yellow', color: 'white' }}>
            Update
          </Button>
          <Button size="small" onClick={handleClickOpen} style={{ backgroundColor: 'red', color: 'white' }}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete Property"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAcknowledge} autoFocus style={{ backgroundColor: 'red', color: 'white' }}>
            Acknowledge
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OwnerPropertyCard;
