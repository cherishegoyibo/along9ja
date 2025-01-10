const { Client } = require("@googlemaps/google-maps-services-js");
const polylineDecoder = require("@mapbox/polyline");

const googleMapsClient = new Client({});

async function isUserOnRoad(userLocation, roadName, proximityThreshold) {
  try {
    // 1. Obtain the road's polyline
    const directionsResponse = await googleMapsClient.directions({
      params: {
        origin: userLocation, // User's current location
        destination: roadName, // Road name to check
        key: "YOUR_API_KEY", // Replace with your Google Maps API key
      },
    });

    const polyline = directionsResponse.data.routes[0].overview_polyline.points;

    // 2. Decode the polyline
    const decodedPolyline = polylineDecoder.decode(polyline);

    // 3. Calculate distance to the road (using Haversine formula or a library)
    const nearestPoint = findNearestPointOnPolyline(
      userLocation,
      decodedPolyline
    );
    const distance = calculateDistance(userLocation, nearestPoint);

    // 4. Check proximity
    return distance <= proximityThreshold;
  } catch (error) {
    console.error("Error checking road proximity:", error);
    return false;
  }
}

// Helper functions for distance calculation and finding nearest point on polyline
// ... (Implementation depends on your preferred methods)

// Example usage
const userLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco
const roadName = "Golden Gate Bridge";
const proximityThreshold = 50; // Meters

isUserOnRoad(userLocation, roadName, proximityThreshold)
  .then((isOnRoad) => {
    if (isOnRoad) {
      console.log("User is on or near Golden Gate Bridge");
    } else {
      console.log("User is not on or near Golden Gate Bridge");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });