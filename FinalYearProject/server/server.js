const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

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
    await mongoose.connect('mongodb+srv://joseph:jotoo223@cluster0.jck3wxg.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    throw err;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
