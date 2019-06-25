const pool = require('./pool');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey  = fs.readFileSync('../id_rsa', 'utf8');

const createUser = (request, response) => {
    const { body } = request;
    const password = body.password;
    const name = body.name;
    const email = body.email;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        pool.query('INSERT into users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash], (error, results) => {
            if (error) {
                return response.status(400).json(results);
            }

            // jwt auth
            jwt.sign({ name, email }, privateKey, { expiresIn: '2h' }, (err, token) => {
                return response.status(200).json({
                    token,
                });
            });
        });
    });
}

const authenticateUser = (request, response) => {
    const { body } = request;
    const email = body.email;
    const password = body.password;

    pool.query('SELECT user_id, name, password from users where email = $1', [email], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        const hash = results.rows[0].password;
        const userName = results.rows[0].name;
        const userID = results.rows[0].user_id;

        bcrypt.compare(password, hash, function(err, res) {
            if (res) {
                // jwt auth
                jwt.sign({ id: userID, name: userName, email: email }, privateKey, { expiresIn: '2h' }, (err, token) => {
                    return response.status(200).json({
                        token,
                    });
                });
            } else {
                return response.status(401).json({});
            }
        });
    });
}

const updateProfile = (request, response) => {
    const { body } = request;
    const name = body.name;
    const email = body.email;

    pool.query('UPDATE users SET name=$1, email=$2', [name, email], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        jwt.sign({ name, email }, privateKey, { expiresIn: '2h' }, (err, token) => {
            return response.status(200).json({
                name,
                email,
                token,
            });
        });
    });
}

module.exports = {
    createUser,
    authenticateUser,
    updateProfile,
}
