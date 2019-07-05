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
                    token
                });
            });
        });
    });
}

const authenticateUser = (request, response) => {
    const { body } = request;
    const email = body.email;
    const password = body.password;
    const vehiclesOwned = [];

    pool.query('SELECT user_id, name, password from users where email = $1', [email], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        pool.query('SELECT vehicle_name from vehicles where is_activated = $1 and email = $2', [true, email], (error, res) => {
            if (error) {
                console.log('could not retrieve vehicles for user');
            } else {
                if (res.rows.length) {
                    res.rows.forEach(val => {
                        vehiclesOwned.push(val.vehicle_name);
                    });
                }
            }
        });

        const hash = results.rows[0].password;
        const userName = results.rows[0].name;
        const userID = results.rows[0].user_id;

        bcrypt.compare(password, hash, function(err, res) {
            if (res) {
                // jwt auth
                jwt.sign({ id: userID, name: userName, email, vehiclesOwned }, privateKey, { expiresIn: '2h' }, (err, token) => {
                    return response.status(200).json({
                        token
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
    const oldEmail = body.oldEmail;
    const newName = body.newName;
    const newEmail = body.newEmail;

    pool.query('UPDATE users SET name=$1, email=$2 WHERE email=$3', [newName, newEmail, oldEmail], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        const name = newName;
        const email = newEmail;

        jwt.sign({ name, email }, privateKey, { expiresIn: '2h' }, (err, token) => {
            return response.status(200).json({
                name,
                email,
                token,
            });
        });
    });
}

const updatePassword = (request, response) => {
    const { body } = request;
    const email = body.email;
    const oldPassword = body.oldPassword;
    const newPassword = body.newPassword;

    pool.query('SELECT password FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        const passHashInDB = results.rows[0].password;

        bcrypt.compare(oldPassword, passHashInDB, function(err, res) {
            if (res) {
                bcrypt.hash(newPassword, saltRounds, (err, newPasswordHash) => {
                    pool.query('UPDATE users SET password=$1 WHERE email=$2', [newPasswordHash, email], (error, results) => {
                        if (error) {
                            return response.status(400).json(results);
                        }

                        return response.status(200).json({});
                    });
                });
            }

            return response.status(401).json({});
        });
    });
}

const addVehicle = (request, response) => {
    const { body } = request;
    const email = body.email;
    const carName = body.carName;
    const arduinoID = body.arduinoID;
    const vehiclesOwned = body.vehiclesOwned;

    pool.query('INSERT into vehicles (vehicle_name, email, is_activated, vehicle_id) VALUES ($1, $2, $3, $4)', [carName, email, true, arduinoID], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        vehiclesOwned.push(carName);

        jwt.sign({ email, vehiclesOwned }, privateKey, { expiresIn: '2h' }, (err, token) => {
            return response.status(200).json({
                token,
                vehiclesOwned
            });
        });
    });
}

const deleteVehicle = (request, response) => {
    const { body } = request;
    const carName = body.carName;
    let vehiclesOwned = body.vehiclesOwned;
    const email = body.email;

    pool.query('DELETE from vehicles WHERE vehicle_name=$1 and email=$2', [carName, email], (error, results) => {
        if (error) {
            return response.status(400).json(results);
        }

        vehiclesOwned = vehiclesOwned.filter(e => e !== carName);

        jwt.sign({ email, vehiclesOwned }, privateKey, { expiresIn: '2h' }, (err, token) => {
            return response.status(200).json({
                token,
                vehiclesOwned
            });
        });
    });
}

module.exports = {
    createUser,
    authenticateUser,
    updateProfile,
    updatePassword,
    addVehicle,
    deleteVehicle,
}
