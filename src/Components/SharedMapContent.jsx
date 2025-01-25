import React, { useEffect, useRef, useState } from "react";
import Directions from "./Directions";
import "../styles/directions.css";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 9.0643,
  lng: 7.4578,
};

export default function SharedMapContent() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-sVqTP5Rc_nVFpiF_pBAOOaysNVCUevc
&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initMap = () => {
        if (mapRef.current) {
          const googleMap = new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 17,
          });
          setMap(googleMap);
          setDirectionsService(new window.google.maps.DirectionsService());
        }
      };
    };

    loadGoogleMapsScript();

    return () => {
      const script = document.querySelector(
        `script[src^="https://maps.googleapis.com/maps/api/js?key="]`,
      );
      if (script) document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div ref={mapRef} style={mapContainerStyle}></div>
      {map && directionsService && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 1000,
          }}
        >
          <Directions map={map} directionsService={directionsService} />
        </div>
      )}
    </div>
  );
}
