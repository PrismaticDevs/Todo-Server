"use strict";

var express = require('express');

var fs = require('fs');

var PORT = process.env.PORT || 3001;

var path = require('path');

var util = require('util');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
var readFromFile = util.promisify(fs.readFile);

var writeToFile = function writeToFile(destination, content) {
  return fs.writeFile(destination, JSON.stringify(content, null, 4), function (err) {
    return err ? console.error(err) : console.info("\nData written to ".concat(destination));
  });
};

var readAndAppend = function readAndAppend(content, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      console.error(err);
    } else {
      var parsedData = JSON.parse(data);
      parsedData.push(content);
      console.log(content, 46);
      writeToFile(file, parsedData);
    }
  });
};

app.get('/todos', function (req, res) {
  readFromFile('./db.json').then(function (data) {
    return res.json(JSON.parse(data));
  });
});
app.post('/add', function (req, res) {
  var task = req.body.task;
  var details = req.body.details;
  var newTodo = {
    task: task,
    details: details
  };
  readAndAppend(newTodo, './db.json');
  res.send('New todo added');
});
app.listen(PORT, function () {
  return console.log("Server listening on port ".concat(PORT));
});