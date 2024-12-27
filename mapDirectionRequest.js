const axios = require('axios');

function getDirections(origin, destination) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  return axios.get(url);
}