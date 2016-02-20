'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');

var app = express();

try { require('dotenv').load() } catch(Error) {};

mongoose.connect( process.env.MONGO_URI || process.env.MONGOLAB_URI );


app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function () {
   console.log('Node.js listening on port ' + port + '...');
});
