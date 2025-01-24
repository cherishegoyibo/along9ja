//query database for route
import { Route } from '../db_model/database.js';
export async function getRoute(origin, destination) {
  try {
    const query = { origin, destination };
    const route = await Route.findOne(query);
    return route.wapoints;
  } catch (error) {
    console.error('Error getting route:', error);
  }
}