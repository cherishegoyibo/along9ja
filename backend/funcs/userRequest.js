import { getLocality } from './getUserAddress.js';
// import { getRoute } from './getRoute.js';

// sample data start
// const waypoints = [
//   { lat: 37.7749, lng: -122.4194, instruction: 'Pick up package at this location.' },
//   {address: 'Finance Bus Stop, Abuja', instruction: 'Deliver package to this address.' },
//   { lat: 37.7833, lng: -122.4008, instruction: 'Deliver package to this address.' },
// ];
// sample end

// Helper function to get user location coordinates
function getUserCoordinates(userLocation) {
    const lat = userLocation.coords.latitude || userLocation.latitude;
    const lon = userLocation.coords.longitude || userLocation.longitude;
    return { lat, lon };
}

// Function to get waypoints
async function getWaypoints(userLocationStreet, destination) {
    try {
        // This is a mock of getting waypoints based on user location and destination
        const route = await getRoute(userLocationStreet, destination);
        return route;
    } catch (error) {
        throw new Error('Error getting waypoints: ' + error.message);
    }
}

// Main userRequest function
export default async function userRequest(userLocation, destination) {
    try {
        const { lat, lon } = getUserCoordinates(userLocation);
        const userLocationStreet = await getLocality(lat, lon);

        // Get the waypoints from the route
        const waypoints = await getWaypoints(userLocationStreet, destination);
        
        // Return the directions and waypoints
        if (waypoints) {
            return {waypoints, destination};
        } else {
            return ('No directions found');
        }
    } catch (error) {
        console.error('Error in userRequest:', error);
        throw new Error('Error processing user request: ' + error.message);
    }
}



// // include files
// import { getDirections } from './mapDirectionRequest.js';
// import { getStreetName } from './getStreetName.js';
// import { getRoute } from './getRoute.js';

// export default async function userRequest(userLocation, destination) {
//     lat = userLocation.coords.latitude || userLocation.latitude;
//     lon = userLocation.coords.longitude || userLocation.longitude;
//     const userLocationStreet = getStreetName(lat, lon);
//     // const destination = req.body.destination;
//     // check from database user location and destination and pull the waypoint/stooppoint
//     const route = getRoute(userLocationStreet, destination);
//     const waypoints = route.waypoints;
//     try {
//         mapout = await getDirections(userLocation, destination, waypoints={});
//         if (mapout)
//             return {mapout, waypoints};
//     }
//     catch(error) {
//         console.log(error);
//     }
// }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // DATABASE: , to, waypoints, instructions

// // Sample waypoint data with instructions
// // const waypoints = [
// //   { lat: 37.7749, lng: -122.4194, instruction: 'Pick up package at this location.' },
// //   {address: 'Finance Bus Stop, Abuja', instruction: 'Deliver package to this address.' },
// //   { lat: 37.7833, lng: -122.4008, instruction: 'Deliver package to this address.' },
// // ];

// // app.get('/directions', async (req, res) => {
// //   const origin = req.query.origin;
// //   const destination = req.query.destination;

// //   // Construct the Google Maps Directions API request URL
// //   let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

// //   // Add waypoints to the request URL
// //   if (waypoints.length > 0) {
// //     url += `&waypoints=`;
// //     waypoints.forEach((waypoint, index) => {
// //       url += `${waypoint.lat},${waypoint.lng}`;
// //       if (index < waypoints.length - 1) {
// //         url += '|';
// //       }
// //     });
// //   }

//   // Fetch directions from the API
// //   const response = await fetch(url);
// //   const data = await response.json();

// //   // Process the response and add instructions to waypoints
// //   const route = data.routes[0];
// //   const legs = route.legs;

// //   // Assuming waypoints are in the same order as legs
// //   for (let i = 0; i < waypoints.length; i++) {
// //     legs[i].instruction = waypoints[i].instruction;
// //   }

// //   // Send the modified directions data to the client
// //   res.json(data);
// // });

// // app.listen(3000, () => {
// //   console.log('Server listening on port 3000');
// // });


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&waypoints=34.0259,-118.2866|34.1381,-118.3531&key=YOUR_API_KEY ///

// const googleMapsClient = require('@google/maps').createClient({
//   key: 'YOUR_API_KEY',
//   Promise: Promise // Use native promises
// });


//   // Construct the request options for the Directions API
//   const requestOptions = {
//     origin: origin,
//     destination: destination,
//     waypoints: waypoints.map(waypoint => ({
//       location: { lat: waypoint.lat, lng: waypoint.lng },
//       stopover: true // Ensure waypoints are treated as stops
//     }))
//   };

//   try {
//     // Fetch directions from the API using the googleMapsClient
//     const response = await googleMapsClient.directions(requestOptions).asPromise();

//     // Process the response and add instructions to waypoints
//     const route = response.json.routes[0];
//     const legs = route.legs;

//     // Assuming waypoints are in the same order as legs
//     for (let i = 0; i < waypoints.length; i++) {
//       legs[i].instruction = waypoints[i].instruction;
//     }

//     // Send the modified directions data to the client
//     res.json(response.json);
//   } catch (error) {
//     console.error('Error fetching directions:', error);
//     res.status(500).json({ error: 'Failed to fetch directions' });
//   };