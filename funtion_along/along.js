
import { User, Route } from '../db_model/database.js';
import jwt from 'jsonwebtoken';

const secret = 'along9ja';








export  async function createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  export async function loginUser(req,res){
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
      // res.status(200).json({ token });
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
  }
  }

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