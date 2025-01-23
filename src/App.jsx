import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import ExploreRoutes from "./pages/ExploreRoutes";
import NearbyBuses from "./pages/NearbyBuses";
import SavedPlaces from "./pages/SavedPlaces";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-routes" element={<ExploreRoutes />} />
        <Route path="/nearby-buses" element={<NearbyBuses />} />
        <Route path="/saved-places" element={<SavedPlaces />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}
