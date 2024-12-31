const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function getRoute(origin, destination) {
  try {
    await client.connect();
    const database = client.db('routes');
    const collection = database.collection('route');
    const query = { origin, destination };
    const route = await collection.findOne(query);
    return route;
  } catch (error) {
    console.error('Error getting route:', error);
  }
}