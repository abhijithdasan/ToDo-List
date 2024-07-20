const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true}, {new: true})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err)) 
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task: task})
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});