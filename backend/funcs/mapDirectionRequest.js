import dotenv from 'dotenv';
dotenv.config();
import {Client} from "@googlemaps/google-maps-services-js";
const googleMapsClient = new Client({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise // Use native promises
});

export async function getDirections(from, to) {
  const requestOptions = {
    origin: from,
    destination: to,
  };
  const response = await googleMapsClient.directions({
    params: requestOptions,
  });
  return response.data;
}
