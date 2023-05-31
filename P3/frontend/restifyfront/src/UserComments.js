import React from 'react';
import UserCommentsComp from './components/UserCommentsComp';

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function UserComments() {
  const [user_id, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token"); // get the token from local storage
    console.log(token); // log the token value
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.user_id); // set the user ID in state
    }
  }, []);

  return (
    <div>
      <h1>User Comments</h1>
      <UserCommentsComp user_id={user_id} />
    </div>
    // <div>
    //   {user_id ? `User ID: ${user_id}` : "No user is logged in"}
    // </div>
  );
}

// const UserComments = () => {
//   // Replace with actual user ID
//   const user_id = 1;

//   return (
//     <div>
//       <h1>User Comments</h1>
//       <UserCommentsComp user_id={user_id} />
//     </div>
//   );
// };

export default UserComments;