const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');


require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true }, // Include username in the schema
});

const User = mongoose.model('User', UserSchema);

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

async function main() {
  try {
    await mongoose.connect('mongodb+srv://joseph:jotoo223@cluster0.jck3wxg.mongodb.net/Herculethes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    throw err;
  }
}

app.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email: email.toLowerCase(), password: hashedPassword, username });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

main().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  difficulty: { type: String },

});

const Exercise = mongoose.model('Exercise', ExerciseSchema);
app.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ message: 'Failed to fetch exercises' });
  }
});

app.post('/exercises', async (req, res) => {
  const { name, description, image, difficulty } = req.body;

  try {
    const exercise = new Exercise({ name, description, image, difficulty });
    await exercise.save();
    res.status(201).json({ message: 'Exercise added successfully' });
  } catch (error) {
    console.error('Error adding exercise:', error);
    res.status(500).json({ message: 'Failed to add exercise' });
  }
});
