import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import pageRoute from './Routes/page.route';
import contentRoute from './Routes/content.route.js';
const userRoute = require('./Routes/user.route.js');

// Initialize App
const app = express();
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'https://landweb.netlify.app', 
  'http://localhost:3000', 
  'https://dropitweb.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, postman, etc.)
    if (!origin) return callback(null, true);

    // Check if the incoming origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));  // Ensure preflight is handled for all routes

// HTML and Static file
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.set('views', `views`);
app.set('view engine', 'hbs');

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
mongoose.connect(
  mongoUri,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  },
);

// Routes
app.use('/api/pages', pageRoute);
app.use('/api/pages/build', contentRoute);
app.use('/api/user', userRoute);

// Start server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
