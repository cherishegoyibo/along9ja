import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import ExploreRoutes from "./pages/ExploreRoutes";
import NearbyBuses from "./pages/NearbyBuses";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/explore-routes" element={<ExploreRoutes />} />
        <Route path="/nearby-buses" element={<NearbyBuses />} />
      </Routes>
    </>
  );
}
