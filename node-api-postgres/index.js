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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/users', db.getUsers);
app.post('/authenticate', db.authenticateUser);
app.post('/createuser', db.createUser);
app.post('/users/getUserByEmail', db.getUserByEmail);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
