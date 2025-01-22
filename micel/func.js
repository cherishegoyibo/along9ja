
import { User, Route, Admin } from '../db_model/database.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
const secret = 'along9ja';




export  async function createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const existinguser = await User.findOne({ email });
      if (existinguser) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  export async function createAdmin(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      const newAdmin = new Admin({ name, email, password });
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  

  export const loginuser = (req, res, next) => {
    passport.authenticate('user-local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message });
  
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({ message: 'Login successful', redirect: '/Homepage' });
      });
    })(req, res, next);
  };
  

  export const loginadmin = (req, res, next) => {
    passport.authenticate('admin-local', (err, admin, info) => {
      if (err) return next(err);
      if (!admin) return res.status(401).json({ message: info.message });
  
      req.logIn(admin, (err) => {
        if (err) return next(err);
        return res.status(200).json({message : yagi});
      });
    })(req, res, next);
  };
  
//   export const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, secret);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid token.' });
//     }
// };
// export function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next(); // If authenticated, allow access to the next route
//   }
//   res.redirect('/login'); 
// }

export function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden: Admins only' });
}
export function isUser(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'user') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden: Users only' });
}

import { User, Route, Admin } from '../db_model/database.js';
import passport from 'passport';
import bcrypt from 'bcrypt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new GoogleStrategy(
    {
      clientID:'1080137272257-a4pmnin4ckgt09pf52b7ijlucn2lchh5.apps.googleusercontent.com' ,
      clientSecret: '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', 
      callbackURL: "http://localhost:5480/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
      }
      return done(null, user); 
    }
  )
);


passport.use('user-local',
  new LocalStrategy(
    { 
      usernameField: 'email',   
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'No user with that email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use('admin-local',
  new LocalStrategy(
    { 
      usernameField: 'email',  
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return done(null, false, { message: 'No admin with that email' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    }
  )
);



passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role || 'user' }); 
});

passport.deserializeUser(async (data, done) => {
  try {
    const Model = data.role === 'admin' ? Admin : User;
    const user = await Model.findById(data.id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

import axios from 'axios';

export async function getLocality(lat, lon) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.API_KEY}`;
  try {
    const response = await axios.get(url);
    for (const result of response.data.results) {
      for (const component of result.address_components) {
        if (component.types.includes("locality")) {
          return component.long_name;
        }
      }
    }
    return NULL;
  } catch (error) {
    console.error('Error fetching street name:', error);
  }
}

import dotenv from 'dotenv';
dotenv.config();
import {Client} from "@googlemaps/google-maps-services-js";
const googleMapsClient = new Client({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise // Use native promises
});

export async function getDirections(from, to) {
  const requestOptions = {
    origin: from,
    destination: to,
  };
  const response = await googleMapsClient.directions({
    params: requestOptions,
  });
  return response.data;
}

//query database for route
export async function getRoute(origin, destination) {
    try {
      const query = { origin, destination };
      const route = await collection.findOne(query);
      return route.wapoints;
    } catch (error) {
      console.error('Error getting route:', error);
    }
  }

  import { getLocality } from './getUserAddress.js';
// import { getRoute } from './getRoute.js';

// sample data start
// const waypoints = [
//   { lat: 37.7749, lng: -122.4194, instruction: 'Pick up package at this location.' },
//   {address: 'Finance Bus Stop, Abuja', instruction: 'Deliver package to this address.' },
//   { lat: 37.7833, lng: -122.4008, instruction: 'Deliver package to this address.' },
// ];
// sample end

// Helper function to get user location coordinates
function getUserCoordinates(userLocation) {
    const lat = userLocation.coords.latitude || userLocation.latitude;
    const lon = userLocation.coords.longitude || userLocation.longitude;
    return { lat, lon };
}

// Function to get waypoints
async function getWaypoints(userLocationStreet, destination) {
    try {
        // This is a mock of getting waypoints based on user location and destination
        const route = await getRoute(userLocationStreet, destination);
        return route.waypoints;
    } catch (error) {
        throw new Error('Error getting waypoints: ' + error.message);
    }
}

// Main userRequest function
export default async function userRequest(userLocation, destination) {
    try {
        const { lat, lon } = getUserCoordinates(userLocation);
        const userLocationStreet = await getLocality(lat, lon);

        // Get the waypoints from the route
        const waypoints = await getWaypoints(userLocationStreet, destination);
        
        // Return the directions and waypoints
        if (waypoints) {
            return {waypoints, destination};
        } else {
            return ('No directions found');
        }
    } catch (error) {
        console.error('Error in userRequest:', error);
        throw new Error('Error processing user request: ' + error.message);
    }
}



// // include files
// import { getDirections } from './mapDirectionRequest.js';
// import { getStreetName } from './getStreetName.js';
// import { getRoute } from './getRoute.js';

// export default async function userRequest(userLocation, destination) {
//     lat = userLocation.coords.latitude || userLocation.latitude;
//     lon = userLocation.coords.longitude || userLocation.longitude;
//     const userLocationStreet = getStreetName(lat, lon);
//     // const destination = req.body.destination;
//     // check from database user location and destination and pull the waypoint/stooppoint
//     const route = getRoute(userLocationStreet, destination);
//     const waypoints = route.waypoints;
//     try {
//         mapout = await getDirections(userLocation, destination, waypoints={});
//         if (mapout)
//             return {mapout, waypoints};
//     }
//     catch(error) {
//         console.log(error);
//     }
// }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // DATABASE: , to, waypoints, instructions

// // Sample waypoint data with instructions
// // const waypoints = [
// //   { lat: 37.7749, lng: -122.4194, instruction: 'Pick up package at this location.' },
// //   {address: 'Finance Bus Stop, Abuja', instruction: 'Deliver package to this address.' },
// //   { lat: 37.7833, lng: -122.4008, instruction: 'Deliver package to this address.' },
// // ];

// // app.get('/directions', async (req, res) => {
// //   const origin = req.query.origin;
// //   const destination = req.query.destination;

// //   // Construct the Google Maps Directions API request URL
// //   let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

// //   // Add waypoints to the request URL
// //   if (waypoints.length > 0) {
// //     url += `&waypoints=`;
// //     waypoints.forEach((waypoint, index) => {
// //       url += `${waypoint.lat},${waypoint.lng}`;
// //       if (index < waypoints.length - 1) {
// //         url += '|';
// //       }
// //     });
// //   }

//   // Fetch directions from the API
// //   const response = await fetch(url);
// //   const data = await response.json();

// //   // Process the response and add instructions to waypoints
// //   const route = data.routes[0];
// //   const legs = route.legs;

// //   // Assuming waypoints are in the same order as legs
// //   for (let i = 0; i < waypoints.length; i++) {
// //     legs[i].instruction = waypoints[i].instruction;
// //   }

// //   // Send the modified directions data to the client
// //   res.json(data);
// // });

// // app.listen(3000, () => {
// //   console.log('Server listening on port 3000');
// // });


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&waypoints=34.0259,-118.2866|34.1381,-118.3531&key=YOUR_API_KEY ///

// const googleMapsClient = require('@google/maps').createClient({
//   key: 'YOUR_API_KEY',
//   Promise: Promise // Use native promises
// });


//   // Construct the request options for the Directions API
//   const requestOptions = {
//     origin: origin,
//     destination: destination,
//     waypoints: waypoints.map(waypoint => ({
//       location: { lat: waypoint.lat, lng: waypoint.lng },
//       stopover: true // Ensure waypoints are treated as stops
//     }))
//   };

//   try {
//     // Fetch directions from the API using the googleMapsClient
//     const response = await googleMapsClient.directions(requestOptions).asPromise();

//     // Process the response and add instructions to waypoints
//     const route = response.json.routes[0];
//     const legs = route.legs;

//     // Assuming waypoints are in the same order as legs
//     for (let i = 0; i < waypoints.length; i++) {
//       legs[i].instruction = waypoints[i].instruction;
//     }

//     // Send the modified directions data to the client
//     res.json(response.json);
//   } catch (error) {
//     console.error('Error fetching directions:', error);
//     res.status(500).json({ error: 'Failed to fetch directions' });
//   };

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const user = new mongoose.Schema({
    google_id : { type: String},
    name: { type: String, required: true, trim: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 15 },
    isGoogleUser: { type: Boolean, default: false },
    role: { type: String, enum: ['user'], default: 'user'},
    profilePic: { type: String, default: "" },  
    createdAt: { type: Date, default: Date.now },
})

user.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

  user.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model('User', user);

const admin = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 7, maxlength: 15 },
  role: { type: String, enum: ['admin'], default: 'admin'},
  createdAt: { type: Date, default: Date.now },
});

admin.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

admin.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin= mongoose.model('Admin', admin);


const Waypoint = new mongoose.Schema({
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    instruction: { type: String, required: false }
  });
  
  const route = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    waypoints: [Waypoint]
  });
  

const Route = mongoose.model('Route', route);


export { User, Route, Admin };

import mongoose from 'mongoose';

const uri = "mongodb+srv://along9ja:0267419026@along9ja.nxr5r.mongodb.net/along9jadb?retryWrites=true&w=majority&appName=along9ja";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export default async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error){
    console.log("Error connecting to MongoDB:", error.message)
  }finally {
    // await mongoose.disconnect();
    console.log('completed cycle');
  }
};

import { Router } from 'express';
const router = Router();

//admin sign in required

// include file
import userRequest from '../funcs/userRequest.js'
import { getDirections } from '../funcs/mapDirectionRequest.js';
import express from 'express';
import { createUser, createAdmin, loginadmin, loginuser,isAdmin,isUser} from '../funtion_along/along.js';
import passport from 'passport';


const router = express.Router();


router.get("/loginuser", loginuser);

router.get("/loginadmin", loginadmin);

router.get("/Homepage", isUser, (req, res) => {
    if (req.user) {
        res.json({ message: `Welcome to the homepage, ${req.user.name}` });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.get('/admin', isAdmin,(res,req) => {
    res.json({message: 'welcome'});
})

// All the routes in this file will be prefixed with /direction
router.route('/directions' )
    .get(isUser, (req, res) => {
     res.send(`GET request to the direction page`);
    })
    .post(isUser,async (req, res) => {
        // need protection for this route, signin required
        const { userLocation, destination } = req.body;
        try {
            const directionsDetail = await userRequest(userLocation, destination);
            res.send(directionsDetail);
        } 
        catch(err) {
            res.status(500).send('Error, try again.');
        }
    });

// router.route('/new')
//     .get((req, res) => {
//         res.send(`GET request to the new direction page`);
//     })
//     .post((req, res) => {
//         const requestData = JSON.stringify(req.body);
//     });

router.route('/update')
    // sign in required
    .post((req, res) => {
        const mapout = getDirections(req.body.from, req.body.to);
        res.send(mapout);
    });

router.post('/createUser', createUser);

router.post('/createAdmin', createAdmin);
    
    
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
    
    router.get(
        "/google/callback",
        passport.authenticate("google", { failureRedirect: "/auth/fallback" }),
        (req, res) => {
          res.json({message: 'Authentication successful!',
            user: req.user});
            
        }
      );


export default router;

