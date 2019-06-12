const pool = require('./pool');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const authenticateUser = (request, response) => {
    // bcrypt.hash('shreyaspassword', saltRounds, (err, hash) => {
    //     // Store hash in your password DB.
    //     pool.query('insert into users (name, email, password) VALUES ($1, $2, $3)', ['Shreyas Devalapurkar', 'shreyasdevalapurkar@gmail.com', hash], (error, results) => {
    //         if (error) {
    //             throw error;
    //         }
          
    //         response.status(201).send(`User added with ID: ${results.insertId}`)
    //     });
    // });
    const email = 'shreyasdevalapurkar@gmail.com';

    pool.query('SELECT password from users where email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        }

        const hash = results.rows[0].password;

        bcrypt.compare('adampassword', hash, function(err, res) {
            console.log(res);
            // res == true
        });
    });

    // pool.query('select * from users', (error, results) => {
    //     if (error) {
    //         throw error;
    //     }

    //     console.log(results);
    // });
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
    authenticateUser
}
