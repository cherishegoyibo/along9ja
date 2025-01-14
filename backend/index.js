import express from 'express';
import directionRoutes from '../Routes/direction.js';
import adminRoutes from '../Routes/admin.js';
import session from 'express-session';
import connectDB from './config/mongo.js';
import routes from './routes/gen1.js'
import passport from 'passport';
import "./funtion_along/passport.js";

connectDB();

const app = express();

// Use route files
app.use('/direction', directionRoutes);
app.use('/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the App');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
