import express from 'express';
import routes from './Routes/direction.js';
// import Routes from '../Routes/admin.js';
import session from 'express-session';
import connectDB from './config/mongo.js';
import passport from 'passport';
import "./funtion_along/passport.js";
import cors from 'cors';
import dotenv from 'dotenv';

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({ secret: "1234567", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const allowedOrigins = ['https://along9ja.onrender.com', 'http://127.0.0.1:5173']; // Add more allowed origins if needed

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // Allow if origin is in the list or is undefined (for same-origin requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, sessions, etc.)
  optionsSuccessStatus: 200 // For older browsers
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});




app.use('/', routes);
// Use route files

//  app.use('/admin', adminRoutes);

// Default route
// app.get('/', (req, res) => {
//     res.send('Welcome to the App');
// });

// Start the server
// const PORT = process.env.BPORT || 11000;
app.listen(process.env.BPORT || 1544, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
