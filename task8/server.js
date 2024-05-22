const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// API endpoints
app.get('/tasks', (req, res) => {
    client.lrange('tasks', 0, -1, (err, reply) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(reply);
        }
    });
});

app.post('/tasks', (req, res) => {
    const task = req.body.task;
    client.rpush('tasks', task, (err, reply) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ message: 'Task added successfully' });
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
