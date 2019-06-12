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
                throw error;
            }

            response.status(201).json(results.rows);
        });
    });
}

const authenticateUser = (request, response) => {
    const email = request.params.email;
    const password = request.params.password;

    pool.query('SELECT password from users where email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        }

        const hash = results.rows[0].password;

        bcrypt.compare(password, hash, function(err, res) {
            if (res) {
                response.status(200);
            } else {
                response.status(401);
            }
        });
    });
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error;
        }
      
        response.status(200).json(results.rows);
    });
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows);
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    authenticateUser,
}
