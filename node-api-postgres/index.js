const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('./queries');

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.get('/users', db.getUsers);

app.get('/users/:id', db.getUserById);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
