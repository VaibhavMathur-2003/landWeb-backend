// models/Webpage.js

const mongoose = require('mongoose');

const webpageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Webpage = mongoose.model('Webpage', webpageSchema);

module.exports = Webpage;
