import axios from 'axios';
export function getStreetName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    axios.get(url)
        .then(response => {
          const StreetName = response.data.address.suburb || response.data.address.county || response.data.address.city || response.data.address.town || response.data.address.village || response.data.address.hamlet || response.data.address.locality || response.data.address.neighbourhood || response.data.address.road || response.data.address.footway || response.data.address.path || response.data.address.pedestrian || response.data.address.cycleway || response.data.address.tertiary || response.data.address.secondary || response.data.address.primary || response.data.address.residential || response.data.address.tertiary_link || response.data.address.secondary_link || response.data.address.primary_link || response.data.address.unclassified || response.data.address.service || response.data.address.living_street || response.data.address.track || response.data.address.steps || response.data.address.road || response.data.address.footway || response.data.address.path || response.data.address.pedestrian || response.data.address.cycleway || response.data.address.tertiary || response.data.address.secondary || response.data.address.primary || response.data.address.residential || response.data.address.tertiary_link || response.data.address.secondary_link || response.data.address.primary_link || response.data.address.unclassified || response.data.address.service || response.data.address.living_street || response.data.address.track || response.data.address.steps;
          if (StreetName) {
            return StreetName;
          }
        })
        .catch()
            return;
}