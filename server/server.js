var express = require('express');
var bodyParser = require('body-parser');
var list = require('./routes/list')

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/list', list);

app.listen(port, function () {
    console.log('server is listening on port', port);
});