const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); // Import your User model

require('dotenv').config(); // Load environment variables from a .env file

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Configure session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Mongoose database
main().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

async function main() {
  try {
    // Replace process.env.MONGODB_URI with your actual MongoDB connection URI
    await mongoose.connect('mongodb+srv://joseph:jotoo223@cluster0.jck3wxg.mongodb.net/Herculethes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000,  // 45 seconds
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    throw err;
  }
}

// Registration route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user document
    const user = new User({ email, password });
    await user.save();
    // Handle successful registration
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle registration error
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
