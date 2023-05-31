import React, { useState } from "react";
import axios from 'axios';
import "./PropertyForm.css";

function PropertyForm() {
  const [property, setProperty] = useState({
    description: "",
    prop_type: "",
    address: "",
    rooms: 1,
    baths: "",
    parking: "",
    max_guests: "",
    rate: "",
    cover_image: null,
  });

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
      const response = await axios.post("http://localhost:8000/property/property/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: "Bearer " + localStorage.getItem("token"),
          Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0ODU4NTI0LCJpYXQiOjE2ODIyNjY1MjQsImp0aSI6ImUzOWZhOWYwMzM5MDRiODZhOTM1ZWE0NDRjZjAyMWUxIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJzYXNhbiJ9.jG_tmhQkuOyaVrI73kcaIhftq-wuWSwjCq8dd7XGXcY",
        },
      });

      if (response.status === 200) {
        alert("Property created successfully!");
        setProperty({
          description: "",
          prop_type: "",
          address: "",
          rooms: 1,
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
        <h1>Property</h1>
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
                <th>
                  <label htmlFor="cover_image">Cover Image:</label>
                </th>
                <td>
                  <input
                    type="file"
                    id="cover_image"
                    name="cover_image"
                    onChange={handleChange}
                    
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit">Create Property</button>
                </td>
              </tr>
    </tbody>
  </table>
</form>
</div>
</div>


   );

}

export default PropertyForm;