export async function getRoute(origin, destination) {
  try {
    const query = { origin, destination };
    const route = await collection.findOne(query);
    return route.wapoints;
  } catch (error) {
    console.error('Error getting route:', error);
  }
}