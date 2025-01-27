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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeSession = async () => {
      const sessionData = await checkSession(); // Use shared session check
      if (sessionData?.isLoggedIn) {
        setUser(sessionData.user);
      }
    };

    initializeSession();
  }, []);

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* // protected route */}
        <Route path="/home"element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/explore-routes"
          element={
            <ProtectedRoute user={user}>
              <ExploreRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/nearby-buses" element={ <ProtectedRoute><NearbyBuses /></ProtectedRoute>  } />
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
