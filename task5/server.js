// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize an empty array to store student data
let students = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', (req, res) => {
  res.json(students);
});

app.post('/data', (req, res) => {
  const { id, name, age, grade } = req.body;

  if (!id || !name || !age || !grade) {
    return res.status(400).send('Missing parameters');
  }

  const newStudent = { id: parseInt(id), name, age: parseInt(age), grade };
  students.push(newStudent);
  res.json(newStudent);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
