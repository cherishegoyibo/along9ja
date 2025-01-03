const express = require('express');
const connectDB = require('./db_model/database');
const userRoutes = require('./routes/gen1');


const app = express();
connectDB();

app.use('/api', userRoutes);














app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });