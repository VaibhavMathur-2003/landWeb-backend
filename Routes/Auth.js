// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// User signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Signup failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Login failed' });
  }
});

module.exports = router;
