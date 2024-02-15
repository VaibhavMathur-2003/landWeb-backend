// routes/webpage.js

const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth');
const Webpage = require('../Models/Webpage');

// Create a new webpage
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newWebpage = new Webpage({
      title,
      content,
      owner: req.user._id
    });
    await newWebpage.save();
    res.status(201).json(newWebpage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all webpages for a specific user
router.get('/', auth, async (req, res) => {
  try {
    const webpages = await Webpage.find({ owner: req.user._id });
    res.json(webpages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a webpage
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedWebpage = await Webpage.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    res.json(updatedWebpage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a webpage
router.delete('/:id', auth, async (req, res) => {
  try {
    await Webpage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Webpage deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
