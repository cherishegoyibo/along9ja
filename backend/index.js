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
dotenv.config();

const app = express();

// Allow specific origins
const allowedOrigins = [
  'https://along9ja.onrender.com', // Your production frontend
  'http://127.0.0.1:5173' // Optional: Keep local dev access
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true // If using cookies/auth headers
}));





app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({ secret: "1234567", resave: false, saveUninitialized: true,
  cookie: { secure: true, sameSite: 'none', maxAge: 6000000 }
 }));
app.use(passport.initialize());
app.use(passport.session());


app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));




app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins);
  res.header('Access-Control-Allow-Credentials', true);
  res.status(err.status || 500).json({ error: err.message });
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
