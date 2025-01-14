import axios from 'axios';

export async function getLocality(lat, lon) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.API_KEY}`;
  try {
    const response = await axios.get(url);
    for (const result of response.data.results) {
      for (const component of result.address_components) {
        if (component.types.includes("locality")) {
          return component.long_name;
        }
      }
    }
    return NULL;
  } catch (error) {
    console.error('Error fetching street name:', error);
  }
}