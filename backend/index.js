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


app.use(cors({
  origin: `http://localhost:${process.env.PORT}`, // or use the actual domain of the frontend when deployed
}));






app.use('/', routes);
// Use route files

//  app.use('/admin', adminRoutes);

// Default route
// app.get('/', (req, res) => {
//     res.send('Welcome to the App');
// });

// Start the server
// const PORT = process.env.BPORT || 11000;
app.listen(process.env.PORT || 1544, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
