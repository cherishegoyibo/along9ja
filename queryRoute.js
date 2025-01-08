// const { MongoClient } = require('mongodb');

//sample data

const waypoints = [
  { lat: 37.7749, lng: -122.4194, instruction: 'Pick up package at this location.' },
  {address: 'Finance Bus Stop, Abuja', instruction: 'Deliver package to this address.' },
  { lat: 37.7833, lng: -122.4008, instruction: 'Deliver package to this address.' },
];

//sample data ends

// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri);

export async function getRoute(origin, destination) {
  try {
    // await client.connect();
    // const database = client.db('routes');
    // const collection = database.collection('route');
    // const destination = `(${destination.join(',')})`;
    // const query = { origin, destination };
    // const route = await collection.findOne(query);
    // return route;
    return waypoints;
  } catch (error) {
    console.error('Error getting route:', error);
  }
}