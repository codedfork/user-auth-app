const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const dotenv = require('dotenv');
const rateLimit = require('../src/middlewares/rateLimitMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(rateLimit);
app.use(express.json());


const corsOptions = (req, callback) => {
  let corsConfig = {
    origin: 'http://api.example.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  // Check if the User-Agent is Dart 
  if (req.headers['user-agent'] === 'Dart') {
    if (req.path === '/api/public') {
      corsConfig = {
        ...corsConfig,
        origin: '*', // Allow any origin for public route
      };
    }
  }
  // Default CORS behavior for other requests
  callback(null, corsConfig);
};

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

//Creating mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));
