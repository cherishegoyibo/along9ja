import React, { useEffect, useRef } from "react";
import "../styles/directions.css";

export default function Directions({ map, directionsService }) {
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    if (map) {
      directionsRendererRef.current =
        new window.google.maps.DirectionsRenderer();
      directionsRendererRef.current.setMap(map);
    }
  }, [map]);

  const calculateAndDisplayRoute = () => {
    const start = document.getElementById("from").value;
    const end = document.getElementById("to").value;

    if (!start || !end) {
      alert("Abeg, try enter where you dey, and where you dey go!");
      return;
    }

    {
      /* Default travel mode set to DRIVING to avoid confusion */
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
            <input type="text" id="from" placeholder="Where you dey?" />
          </div>
          <div>
            <input type="text" id="to" placeholder="Where you dey go?" />
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
