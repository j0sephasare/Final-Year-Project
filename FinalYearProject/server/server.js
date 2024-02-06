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
const SavedExerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  exerciseName: { type: String, required: true },
  volume: { type: Number, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
});

const SavedExercise = mongoose.model('SavedExercise', SavedExerciseSchema);

app.post('/SavedExercises', async (req, res) => {
  const { userId, exerciseName, volume, sets, reps } = req.body;

  console.log('Received exercise data:', req.body);

  try {
    const savedExercise = new SavedExercise({ userId, exerciseName, volume, sets, reps });
    await savedExercise.save();
    console.log('Exercise saved successfully:', savedExercise);
    res.status(201).json({ message: 'Exercise saved successfully' });
  } catch (error) {
    console.error('Error saving exercise:', error);
    res.status(500).json({ message: 'Failed to save exercise' });
  }
});
app.get('/SavedExercises', async (req, res) => {
  const userId = req.query.userId;

  try {
    const savedExercises = await SavedExercise.find({ userId });
    res.status(200).json(savedExercises);
  } catch (error) {
    console.error('Error fetching saved exercises:', error);
    res.status(500).json({ message: 'Failed to fetch saved exercises' });
  }
});

app.get('/savedExercises/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const savedExercises = await SavedExercise.find({ userId: userId });
    res.status(200).json(savedExercises);
  } catch (error) {
    console.error('Error fetching saved exercises:', error);
    res.status(500).json({ message: 'Failed to fetch saved exercises' });
  }
});

// Update and Delete endpoints for Saved Exercises

// PUT endpoint for updating a saved exercise
app.put('/savedExercises/:id', async (req, res) => {
  const { id } = req.params;
  const { volume, sets, reps } = req.body;

  try {
    const updatedExercise = await SavedExercise.findByIdAndUpdate(id, { volume, sets, reps }, { new: true });
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).json({ message: 'Failed to update exercise' });
  }
});

// DELETE endpoint for deleting a saved exercise
app.delete('/savedExercises/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExercise = await SavedExercise.findByIdAndDelete(id);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({ message: 'Failed to delete exercise' });
  }
});


// Define the Schema for the boxing workout exercises
const BoxingExercisesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  intensity: { type: String, required: true },
  equipment: [{ type: String }], // Assuming 'equipment' is an array of strings
  type: { type: String, required: true }
});

// Create a model from the schema
const BoxingExercises = mongoose.model('BoxingExercises', BoxingExercisesSchema,'BoxingExercises');

// Route to get boxing workout exercises
app.get('/BoxingExercises', async (req, res) => {
  try {
    const exercises = await BoxingExercises.find(); // Use the model to find documents
    console.log('Exercises found:', exercises);
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Error fetching boxing workout exercises:', error);
    res.status(500).json({ message: 'Failed to fetch boxing workout exercises' });
  }
});
