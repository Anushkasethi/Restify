import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './components/PropertyCard';
import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ parking: '', baths: '', rooms: '' });
  const [ordering, setOrdering] = useState('');

  useEffect(() => {
    async function fetchProperties() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://127.0.0.1:8000/property/property/customer/search/', {
            headers: { 
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0MTI3NjY2LCJpYXQiOjE2ODE1MzU2NjYsImp0aSI6IjQzZjI5ODdlMTg0OTRlYWI4Nzg5MGRjMzZmZDgyMDhmIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJzYXNhbiJ9.2Y3cGyz3OosFMcz2inM2FSQD8amulqOaStZqnL0x3yQ'
                
            },  
        params: {
            page: currentPage,
            parking: filters.parking,
            baths: filters.baths,
            rooms: filters.rooms,
            ordering: ordering,
          },
        });

        setProperties(response.data.results); // Update this based on your API response structure
        const totalPages = Math.ceil(response.data.count/6);
        setTotalPages(totalPages); // Update this based on your API response structure
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }

    fetchProperties();
  }, [currentPage, filters, ordering]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleOrderChange = (e) => {
    setOrdering(e.target.value);
  };

  return (
    <div className="property-list">
      <div className="filter-ordering-container">
        <label>
          Parking:
          <input type="number" name="parking" value={filters.parking} onChange={handleFilterChange} />
        </label>
        <label>
          Baths:
          <input type="number" name="baths" value={filters.baths} onChange={handleFilterChange} />
        </label>
        <label>
          Rooms:
          <input type="number" name="rooms" value={filters.rooms} onChange={handleFilterChange} />
        </label>
        <label>
          Order by:
          <select value={ordering} onChange={handleOrderChange}>
            <option value="">Select</option>
            <option value="baths">Baths</option>
            <option value="-baths">Baths (desc)</option>
            <option value="rooms">Rooms</option>
            <option value="-rooms">Rooms (desc)</option>
          </select>
        </label>
      </div>
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;