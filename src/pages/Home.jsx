import React, { useState, useEffect }  from "react";
import SharedMapContent from "../Components/SharedMapContent";
import {  useNavigate } from "react-router-dom";
import { checkSession } from "./layout";


export default function Home() {

  const [user, setUser] = useState(null); // To store user details
  const navigate = useNavigate(); // To navigate to other page
    useEffect(() => {
      const fetchUserData = async () => {
        const sessionData = await checkSession();
        if (sessionData?.isLoggedIn) {
          setUser(sessionData.user);
        }
      };
  
      fetchUserData();
    }, []);

      

  if (user === null) {
    return <div>Loading...</div>
  }


  return (
    <div style={{ textAlign: "center", color: "#ffc700", marginTop: "10px" }}>
    {/* <Navbar user={user} /> */}
        <h1>Welcome to Along9ja! {user.name}</h1>
      <SharedMapContent />
    </div>
  );
}
