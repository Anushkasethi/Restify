import React, { useState , useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./PropertyForm.css";

function PropertyChangeForm() {
  const [property, setProperty] = useState({
    description: "",
    prop_type: "",
    address: "",
    rooms: "",
    baths: "",
    parking: "",
    max_guests: "",
    rate: "",
    cover_image: null,
  });
  const params = useParams();
  const prop_id = params.prop_id;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/property/property/${prop_id}/`, {
          headers: {
            Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0ODk2MDY1LCJpYXQiOjE2ODIzMDQwNjUsImp0aSI6ImQxZmY2NzlkOGU1ODRhMGE4MWMwMDNmMmIyOGU2ZWE5IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJzYXNhbjIifQ.kMaq7WhYSQRNlaIygTqXg8Ghwg9xKDTPkC8Ps_xBeCY",
        },
        });

        if (response.status === 200) {
        console.log("Response data:", response.data);
        setProperty((prevState) => ({
            ...prevState,
            ...response.data[0],
          }));
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [prop_id]);

  const handleChange = (event) => {
    if (event.target.name === "cover_image") {
      setProperty({
        ...property,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setProperty({
        ...property,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(property).forEach((key) => {
      if (property[key] !== null) {
        formData.append(key, property[key]);
      }
    });

    try {
      const response = await axios.put(`http://localhost:8000/property/property/${prop_id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: "Bearer " + localStorage.getItem("token"),
          Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0ODk2MDY1LCJpYXQiOjE2ODIzMDQwNjUsImp0aSI6ImQxZmY2NzlkOGU1ODRhMGE4MWMwMDNmMmIyOGU2ZWE5IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJzYXNhbjIifQ.kMaq7WhYSQRNlaIygTqXg8Ghwg9xKDTPkC8Ps_xBeCY",
        },
      });

      if (response.status === 200) {
        alert("Property created successfully!");
        setProperty({
          description: "",
          prop_type: "",
          address: "",
          rooms: "",
          baths: "",
          parking: "",
          max_guests: "",
          rate: "",
          cover_image: null,
        });
      } else {
        alert("Error creating property.");
      }
    } catch (error) {
      console.error("Error creating property:", error);
      console.log("Error response:", error.response.data); 
      alert("Error creating property.");
    }
  };

  return (
    <div className="reservation-container">
      <div className="reservation-box">
        <h1>Property Change</h1>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <table>
            <tbody>
            <tr>
                <th><label htmlFor="description">Description:</label></th>
                <td><input type="text" id="description" name="description" value={property.description} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="address">Address:</label></th>
                <td><input type="text" id="address" name="address" value={property.address} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="prop_type">Property Type:</label></th>
                <td><input type="text" id="prop_type" name="prop_type" value={property.prop_type} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="rooms">Rooms:</label></th>
                <td><input type="number" id="rooms" name="rooms" value={property.rooms} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="baths">Baths:</label></th>
                <td><input type="number" id="baths" name="baths" min="1" value={property.baths} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="parking">Parking:</label></th>
                <td><input type="number" id="parking" name="parking"  value={property.parking} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="max_guests">Number of Guests:</label></th>
                <td><input type="number" id="max_guests" name="max_guests" min="1" value={property.max_guests} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="rate">Rate:</label></th>
                <td><input type="number" id="rate" name="rate" value={property.rate} onChange={handleChange} required /></td>
              </tr>
              
              <tr>
                <td colSpan="2">
                  <button type="submit">Update Property</button>
                </td>
              </tr>
    </tbody>
  </table>
</form>
</div>
</div>


   );

}

export default PropertyChangeForm;