const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/insight", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connection to database successful"))
  .catch(console.error);

const Todo = require('./models/todo');

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post('/todo/new', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save();

  res.json(todo);
});

app.delete('todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id)

  res.json(result);
});

app.listen(3001, () => console.log("Server initialized @ Port 3001"));