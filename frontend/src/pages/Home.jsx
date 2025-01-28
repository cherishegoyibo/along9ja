import React, { useState, useEffect }  from "react";
import SharedMapContent from "../Components/SharedMapContent";
import {  useNavigate } from "react-router-dom";
import { checkSession } from "./layout";
import "../styles/home.css";



export default function Home() {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage if available
    const storedUser = localStorage.getItem("userSession");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        const sessionData = await checkSession();
        if (sessionData?.isLoggedIn) {
          setUser(sessionData.user);
          localStorage.setItem("userSession", JSON.stringify(sessionData.user)); // Save to localStorage
          console.log(sessionData.user);
        } else {
          navigate("/"); // Redirect to login if session is invalid
        }
      }
    };

    fetchUserData();
  }, [user, navigate]);

 

  console.log("johnyyyy",user);

  if (user === null) {
    return <div>Loading...</div>; // Show a loading message while user data is being fetched
  }

  return (
    <div className="home-cc">
      <h1>Your Face Show! &#x27A1; &#x1F31F;{user.user.name}</h1>

      <SharedMapContent />
    </div>
    
  );
}
