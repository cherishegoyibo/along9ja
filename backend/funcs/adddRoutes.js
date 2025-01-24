import { Route } from '../db_model/database.js';

export async function addRoute(origin, destination, waypoints) {
  try {
    const query = { origin, destination, waypoints };
    const route = await Route.create(query);
    return route;
  } catch (error) {
    console.error('Error adding route:', error);
  }
}
