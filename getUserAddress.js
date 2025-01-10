import axios from 'axios';
export function getStreetName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.API_KEY}`;
    axios.get(url)
        .then(response => {
          const StreetName = response.data.address.suburb;
          if (StreetName) {
            return StreetName;
          }
        })
        .catch()
            return;
}