import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function UserID() {
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
      {user_id ? `User ID: ${user_id}` : "No user is logged in"}
    </div>
  );
}

export default UserID;