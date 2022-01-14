"use strict";

var express = require('express');

var fs = require('fs');

var PORT = process.env.PORT || 3001;

var path = require('path');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
var list = [{
  id: 1,
  task: "Get a job",
  details: "Apply to 6 a day."
}, {
  id: 2,
  task: "Register on job boards",
  details: "Sign up for 5 job board sites."
}];
app.get('/todos', function (req, res) {
  res.json(list);
});
app.post('/add', function (req, res) {
  var task = req.body.task;
  var details = req.body.details;
  console.log('hit');
  res.end();
});
app.listen(PORT, function () {
  return console.log("Server listening on port ".concat(PORT));
});