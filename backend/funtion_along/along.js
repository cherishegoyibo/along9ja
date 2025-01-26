
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
      if (err) return next(err); // Handle errors during authentication
      if (!user) return res.status(401).json({ message: info.message }); // If user not found
  
      req.logIn(user, (err) => {
        if (err) return next(err); // Handle errors during login
  
        // On successful login, return user info
        return res.status(200).json({
          message: 'Login successful',
          user: { 
            name: req.user.name // Return user's name
          }
        });
      });
    })(req, res, next); // Authenticate the request
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
  

  export const logoutuser = (req, res, next) => {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          return next(err); // Handle error if logout fails
        }
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ message: 'Failed to destroy session during logout' });
            console.log(err);
          }
          res.clearCookie('connect.sid'); // Clear the session cookie
          return res.status(200).json({ message: 'Logout successful' });
        });
      });
    } else {
      res.status(401).json({ message: 'You are not logged in' }); 
    }
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
export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized: Please log in' });
}
