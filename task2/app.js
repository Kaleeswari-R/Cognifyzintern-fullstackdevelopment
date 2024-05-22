const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const formData = [];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    if (!name || !email) {
        res.status(400).send("Please fill out all fields.");
    } else {
        formData.push({ name, email });
        res.send('Form submitted successfully!');
    }
});

app.get('/data', (req, res) => {
    res.render('data', { formData: formData });
});

app.listen(port, () => {
    console.log('Server is listening on port' +port);
});
