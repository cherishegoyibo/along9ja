
import { User, Route } from '../db_model/database.js';


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