import mongoose from 'mongoose';

const uri = "mongodb+srv://along9ja:0267419026@along9ja.nxr5r.mongodb.net/?retryWrites=true&w=majority&appName=along9ja";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch (error){
    console.log("Error connecting to MongoDB:", error.message)
  }finally {
    await mongoose.disconnect();
  }
};


module.exports = run;