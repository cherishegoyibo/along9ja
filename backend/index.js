import express from 'express';
import routes from './Routes/direction.js';
// import Routes from '../Routes/admin.js';
import session from 'express-session';
import connectDB from './config/mongo.js';
import passport from 'passport';
import "./funtion_along/passport.js";
import cors from 'cors';

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({ secret: "1234567", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://along9ja.onrender.com/'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Include if using cookies/auth
}));






app.use('/', routes);
// Use route files

//  app.use('/admin', adminRoutes);

// Default route
// app.get('/', (req, res) => {
//     res.send('Welcome to the App');
// });

// Start the server
const PORT = 5480;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
