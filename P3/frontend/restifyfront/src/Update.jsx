import React, { useState, useEffect } from 'react';
import './Update.css';
import jwtDecode from "jwt-decode";



  

  // return (
  //   <div>
  //     {user_id ? `User ID: ${user_id}` : "No user is logged in"}
  //   </div>
  // );





function Update() {
  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token"); // get the token from local storage
    console.log(token); // log the token value
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.user_id); // set the user ID in state
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/accounts/update/${user_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
      }),
    })
    .then(response => {
        if (response.ok) {
            alert("User updated!");
            return response.json();
            
        } else {
            alert("Error occured");
        }
    })
      .then(data => setResponse(JSON.stringify(data)))
      .catch(error => console.error(error));
  };

  return (
    
    <div  className="update-container">
      <h2>Update Account</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>
          User ID:
          <input type="number" value={user_id} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br /> */}
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          First name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
