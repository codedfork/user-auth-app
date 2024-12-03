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

// CORS Configuration
const corsOptions = {
  origin: 'http://api.example.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

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
