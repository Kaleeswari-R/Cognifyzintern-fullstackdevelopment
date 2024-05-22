const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.render('index');
}
);
app.post('/submit', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    res.send('Thank you, ' + name + ', for submitting your email ' + email + '.');
}
);
app.listen(port, function() {
    console.log('Server is listening on port ' + port);
}
);
