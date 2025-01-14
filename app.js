import express from 'express';
import session from 'express-session';
import connectDB from './config/mongo.js';
import routes from './routes/gen1.js'
import passport from 'passport';
import "./funtion_along/passport.js";

connectDB();

const app = express();
app.use(express.json());
app.use(session({ secret: "1234567", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());





app.use('/api/along9ja', routes);

















const port = 5480;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });