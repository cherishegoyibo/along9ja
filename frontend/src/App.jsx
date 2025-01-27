import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import ExploreRoutes from "./pages/ExploreRoutes";
import NearbyBuses from "./pages/NearbyBuses";
import Login from "./pages/Login";
import checkSession from "../src/pages/layout";
import ProtectedRoute from "../src/Components/protectroute";

export default function App() {
  const location = useLocation();
  const noNavbarRoutes = ["/", "/sign-up"];
  const [user, setUser] = useState(() => {
    // Initialize from local storage on first load
    const savedSession = localStorage.getItem("userSession");
    return savedSession ? JSON.parse(savedSession).user : null;
  });

      useEffect(() => {
        const initializeSession = async () => {
          const sessionData = localStorage.getItem("userSession");
          if (sessionData) {
            setUser(JSON.parse(sessionData)); // Restore user data
          }
        };
      
        initializeSession();
      }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userSession"); // Clear session from local storage
  };


  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar user={user} onLogout={handleLogout}/>}
      <Routes>
        <Route path="/" element= {<Login />}/>
        <Route path="/sign-up" element={<SignUp />} />
        {/* // protected route */}
        {/* <Route path="/home"element={<Home />}/> */}
        <Route
          path="/about-us"
          element={
            <ProtectedRoute user={user}>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore-routes"
          element={
            <ProtectedRoute user={user}>
              <ExploreRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nearby-buses"
          element={
            <ProtectedRoute user={user}>
              <NearbyBuses />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}






// export default function App() {
//   const location = useLocation();
//   const noNavbarRoutes = ["/","/sign-up"]; 
//   return (
//     <>
//      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<Home/>} />
//         <Route path="/about-us" element={<AboutUs />} />
//         {/* <Route path="/" element={<S/>} /> */}
//         <Route path="/explore-routes" element={<ExploreRoutes />} />
//         <Route path="/nearby-buses" element={<NearbyBuses />} />
//       </Routes>
//     </>
//   );
// }
