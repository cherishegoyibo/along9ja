// import mongoose from 'mongoose';

// const uri = "mongodb+srv://along9ja:0267419026@along9ja.nxr5r.mongodb.net/along9jadb?retryWrites=true&w=majority&appName=along9ja";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// export default async function connectDB() {
//   try {
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error){
//     console.log("Error connecting to MongoDB:", error.message)
//   }finally {
//     // await mongoose.disconnect();
//     console.log('completed cycle');
//   }
// };
import mongoose from 'mongoose';

// MongoDB connection URI
const uri = "mongodb+srv://along9ja:0267419026@along9ja.nxr5r.mongodb.net/along9jadb?retryWrites=true&w=majority&appName=along9ja";

// Mongoose connection options
const clientOptions = {
  useNewUrlParser: true, // Ensures new URL parser is used
  useUnifiedTopology: true, // Uses the new connection management engine
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
};

export default async function connectDB() {
  try {
    // Connecting to MongoDB
    await mongoose.connect(uri, clientOptions);
    
    // Check connection by sending a ping
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    // Handle connection errors
    console.log("Error connecting to MongoDB:", error.message);
  } finally {
    // Cleanup logic if needed
    console.log('Completed connection cycle');
  }
}


