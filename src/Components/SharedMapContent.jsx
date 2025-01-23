import React, { useEffect, useRef } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 9.0643,
  lng: 7.4578,
};

export default function Home() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-sVqTP5Rc_nVFpiF_pBAOOaysNVCUevc&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initMap = () => {
        if (mapRef.current) {
          new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 16,
          });
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

  return <div ref={mapRef} style={mapContainerStyle}></div>;
}
