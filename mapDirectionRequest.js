import { Directions } from "@mapbox/mapbox-sdk/services/directions";

const directionClient = Directions({
  acessToken: 'API_TOKEN'
});

export async function getDirections(origin, destination, waypoints) {
  directionClient.getDirections({
    profile: 'driving',
    waypoints: waypoints,
    geometries: 'geojson'
  })
  .send()
  .then(response => {
    return response.body;
  })
  .catch(error => {
    console.error('Error fetching directions:', error);
    return { error: 'Failed to fetch directions' };
  });


  // const requestOptions = {
  //   origin: origin,
  //   destination: destination,
  //   waypoints: waypoints.map(waypoint => {
  //     // Check if the waypoint is lat/lng-based
  //     if (waypoint.lat !== undefined && waypoint.lng !== undefined) {
  //       return {
  //         location: { lat: waypoint.lat, lng: waypoint.lng },
  //         instruction: waypoint.instruction,
  //         stopover: true
  //       };
  //     }
  
  //     // Check if the waypoint is address-based
  //     if (waypoint.address !== undefined) {
  //       return {
  //         location: waypoint.address,
  //         instruction: waypoint.instruction,
  //         stopover: true
  //       };
  //     }
  
  //     // Check if the waypoint is place-based
  //     if (waypoint.place !== undefined) {
  //       return {
  //         location: waypoint.place,
  //         instruction: waypoint.instruction,
  //         stopover: true
  //       };
  //     }
  
  //     // Handle unexpected formats (optional)
  //     return;
  //   })
  // };
  

  // try {
  //   // Fetch directions from the API using the googleMapsClient
  //   const response = await googleMapsClient.directions(requestOptions).asPromise();

  //   // Process the response and add instructions to waypoints
  //   const route = response.json.routes[0];
  //   const legs = route.legs;

  //   // Assuming waypoints are in the same order as legs
  //   for (let i = 0; i < waypoints.length; i++) {
  //     legs[i].instruction = waypoints[i].instruction;
  //   }

  //   // Send the modified directions data to the client
  //   res.json(response.json);
  // } catch (error) {
  //   console.error('Error fetching directions:', error);
  //   res.status(500).json({ error: 'Failed to fetch directions' });
  // };
}
