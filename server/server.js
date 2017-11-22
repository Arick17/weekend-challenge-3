var express = require('express');
var bodyParser = require('body-parser');

var shoes = require('./routes/stuff');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// if this is /shoes/7, it will enter shoes.js as /7
app.use('/stuff', stuff);

app.listen(port, function () {
    console.log('server is listening on port', port);
});