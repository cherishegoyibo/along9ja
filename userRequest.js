// include files

const userLocation = req.body.cord; // cordinate from form
const userLocationStreet = getStreetName(userLocation.lat, userLocation.lon);
const destination = req.body.destination;
// check from database user location and destination and pull the waypoint/stooppoint
const route = getRoute(userLocationStreet, destination);
const waypoints = route.waypoints;
try {
    mapout = getDirections(userLocation, destination, waypoints={});
    if (mapout)
        return {mapout, waypoints};
}
catch(error) {
    console.log(error);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
from, to, waypoints, instructions

// Sample waypoint data with instructions
const waypoints = [
  { lat: 37.7749, lng: -122.4194, instruction: 'Pick up package at this location.' },
  {address: 'Finance Bus Stop, Abuja', instruction: 'Deliver package to this address.' },
  { lat: 37.7833, lng: -122.4008, instruction: 'Deliver package to this address.' },
];

// app.get('/directions', async (req, res) => {
//   const origin = req.query.origin;
//   const destination = req.query.destination;

//   // Construct the Google Maps Directions API request URL
//   let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

//   // Add waypoints to the request URL
//   if (waypoints.length > 0) {
//     url += `&waypoints=`;
//     waypoints.forEach((waypoint, index) => {
//       url += `${waypoint.lat},${waypoint.lng}`;
//       if (index < waypoints.length - 1) {
//         url += '|';
//       }
//     });
//   }

  // Fetch directions from the API
//   const response = await fetch(url);
//   const data = await response.json();

//   // Process the response and add instructions to waypoints
//   const route = data.routes[0];
//   const legs = route.legs;

//   // Assuming waypoints are in the same order as legs
//   for (let i = 0; i < waypoints.length; i++) {
//     legs[i].instruction = waypoints[i].instruction;
//   }

//   // Send the modified directions data to the client
//   res.json(data);
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&waypoints=34.0259,-118.2866|34.1381,-118.3531&key=YOUR_API_KEY ///

const googleMapsClient = require('@google/maps').createClient({
  key: 'YOUR_API_KEY',
  Promise: Promise // Use native promises
});


  // Construct the request options for the Directions API
  const requestOptions = {
    origin: origin,
    destination: destination,
    waypoints: waypoints.map(waypoint => ({
      location: { lat: waypoint.lat, lng: waypoint.lng },
      stopover: true // Ensure waypoints are treated as stops
    }))
  };

  try {
    // Fetch directions from the API using the googleMapsClient
    const response = await googleMapsClient.directions(requestOptions).asPromise();

    // Process the response and add instructions to waypoints
    const route = response.json.routes[0];
    const legs = route.legs;

    // Assuming waypoints are in the same order as legs
    for (let i = 0; i < waypoints.length; i++) {
      legs[i].instruction = waypoints[i].instruction;
    }

    // Send the modified directions data to the client
    res.json(response.json);
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ error: 'Failed to fetch directions' });
  };