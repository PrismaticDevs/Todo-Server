const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const list = [{
        id: 1,
        task: "Get a job",
        details: "Apply to 6 a day."
    },
    {
        id: 2,
        task: "Register on job boards",
        details: "Sign up for 5 job board sites."
    }
];

app.get('/todos', (req, res) => {
    res.json(list);
});

app.post('/add', (req, res) => {
    let task = req.body.task;
    let details = req.body.details;
    console.log('hit');
    res.end()
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));