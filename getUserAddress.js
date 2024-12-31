const axios = require('axios');
export function getStreetName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
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