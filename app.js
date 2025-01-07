import express from 'express';

import connectDB from './config/mongo.js';
import routes from './routes/gen1.js'

connectDB();

const app = express();
app.use(express.json());
app.use('/api/along9ja', routes);


















const port = 5480;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });