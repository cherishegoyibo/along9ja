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
    const mode = document.getElementById("mode").value;

    if (!start || !end) {
      alert("Abeg, try enter where you dey, and where you dey go!");
      return;
    }

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
      <div id="floating-panel">
        <div>
          <input type="text" id="from" placeholder="Where you dey?" />
        </div>
        <div>
          <input type="text" id="to" placeholder="Where you dey go?" />
        </div>

        <b>How you wan travel?</b>
        <select id="mode">
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
        </select>
        <div className="directions">
          <div id="floating-panel">
            <button
              className="directions-button"
              onClick={calculateAndDisplayRoute}
            >
              Show Me Road <i class="fa-solid fa-route"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
