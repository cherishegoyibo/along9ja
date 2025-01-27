import React, { useEffect, useRef } from "react";
import "../styles/directions.css";

export default function Directions({ map, directionsService }) {
  const directionsRendererRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  useEffect(() => {
    if (map) {
      directionsRendererRef.current =
        new window.google.maps.DirectionsRenderer();
      directionsRendererRef.current.setMap(map);

      const fromAutocomplete = new window.google.maps.places.Autocomplete(
        fromInputRef.current,
      );
      const toAutocomplete = new window.google.maps.places.Autocomplete(
        toInputRef.current,
      );

      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(4.0, 2.0),
        new window.google.maps.LatLng(14.0, 15.0),
      );
      fromAutocomplete.setBounds(bounds);
      toAutocomplete.setBounds(bounds);
    }
  }, [map]);

  const calculateAndDisplayRoute = () => {
    const start = fromInputRef.current.value;
    const end = toInputRef.current.value;

    if (!start || !end) {
      alert("Abeg, try enter where you dey, and where you dey go!");
      return;
    }

    {
      /* Default travel mode set to DRIVING to avoid confusion while selecting mode of travel by the user*/
    }
    const mode = "DRIVING";

    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode[mode],
      },
      (response, status) => {
        if (status === "OK") {
          directionsRendererRef.current.setDirections(response);
        } else {
          alert("Directions request failed: " + status);
        }
      },
    );
  };

  return (
    <>
      <div className="parent-container">
        <div id="floating-panel">
          <div>
            <input
              type="text"
              id="from"
              ref={fromInputRef}
              placeholder="Where you dey?"
            />
          </div>
          <div>
            <input
              type="text"
              id="to"
              ref={toInputRef}
              placeholder="Where you dey go?"
            />
          </div>
          <div className="directions">
            <div id="floating-panel">
              <button
                className="directions-button"
                onClick={calculateAndDisplayRoute}
              >
                Show Me Road <i className="fa-solid fa-route"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
