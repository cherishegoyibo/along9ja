import React from "react";
import CustomMap from "./CustomMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import "../styles/along9ja.css";

const MapNaija = () => {
  return (
    <div className="along-naija">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <CustomMap />
      </APIProvider>
    </div>
  );
};

export default MapNaija;
