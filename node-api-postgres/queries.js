const pool = require('./pool');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = (request, response) => {
    const { body } = request;
    const password = body.password;
    const name = body.name;
    const email = body.email;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        // Store hash in your password DB
        pool.query('INSERT into users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash], (error, results) => {
            if (error) {
                return response.status(400).json(results);
            }

            return response.status(201).json(results.rows);
        });
    });
}

const authenticateUser = (request, response) => {
    const { body } = request;
    const email = body.email;
    const password = body.password;

    pool.query('SELECT password from users where email = $1', [email], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        const hash = results.rows[0].password;

        bcrypt.compare(password, hash, function(err, res) {
            if (res) {
                return response.status(200).json({});
            } else {
                return response.status(401).json({});
            }
        });
    });
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            return response.status(400).json({});
        }
      
        return response.status(200).json(results.rows);
    });
}

const getUserByEmail = (request, response) => {
    const { body } = request;
    const email = body.email;

    pool.query('SELECT name from users where email = $1', [email], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        const nameResultJson = results.rows[0];
        return response.status(200).json(nameResultJson);
    });
}

module.exports = {
    getUsers,
    createUser,
    authenticateUser,
    getUserByEmail,
}
