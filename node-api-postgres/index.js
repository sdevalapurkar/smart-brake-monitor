const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('./queries');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey  = fs.readFileSync('../id_rsa', 'utf8');

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

app.post('/authstatus', verifyJWTToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            return res.status(400).json({ message: 'bad req' });
        }

        return res.status(200).json({
            authData,
        });
    });
});

app.get('/users', verifyJWTToken, db.getUsers);
app.post('/authenticate', db.authenticateUser);
app.post('/createuser', db.createUser);
app.post('/users/getUserByEmail', db.getUserByEmail);

// verify JWT Token middleware
function verifyJWTToken(req, res, next) {
    /* get auth header value
    token format (bearer token)
    AUTHORIZATION: Bearer <access_token> */
    const bearerHeader = req.body.headers.Authorization;

    if (typeof bearerHeader === undefined || !bearerHeader) {
        return res.status(403).json({ message: 'unauthorized for route' });
    }

    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
}

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
