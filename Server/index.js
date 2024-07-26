const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors({
  origin: ["http://marx-todo.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Use the environment variable for MongoDB URI
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get('/api/todos', (req, res) => {
  console.log('Received GET request to /api/todos');
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => {
      console.error('Error retrieving todos:', err);
      res.status(500).json(err);
    });
});

app.put('/update/:id', (req, res) => {
  console.log('Received PUT request to /update/:id');
  const { id } = req.params;
  const { done } = req.body;
  TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
    .then(result => res.json(result))
    .catch(err => {
      console.error('Error updating todo:', err);
      res.status(500).json(err);
    });
});

app.delete('/delete/:id', (req, res) => {
  console.log('Received DELETE request to /delete/:id');
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => {
      console.error('Error deleting todo:', err);
      res.status(500).json(err);
    });
});

app.post('/add', (req, res) => {
  console.log('Received POST request to /add');
  const { task } = req.body;
  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => {
      console.error('Error adding todo:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
