import axios from 'axios';
export function getStreetName(lat, lon) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.API_KEY}`;
    axios.get(url)
        .then(response => {
          for (const result of response.results) {
            for (const component of result.address_components) {
              if (component.types.includes("locality")) {
                return component.long_name;
              }
            }
          }
        });
}