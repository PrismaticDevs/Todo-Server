const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const path = require('path');
const util = require('util');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            console.log(content, 46);
            writeToFile(file, parsedData);
        }
    });
};

app.get('/todos', (req, res) => {
    readFromFile('./db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/add', (req, res) => {
    let task = req.body.task;
    let details = req.body.details;
    const newTodo = {
        task: task,
        details: details,
    };
    readAndAppend(newTodo, './db.json')
    res.send('New todo added')
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));