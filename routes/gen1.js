import express from 'express';
const User = require('../db_model/database');

const router = express.Router();

router.post('/create-user', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const newUser = new User({ name, email, password, age });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
