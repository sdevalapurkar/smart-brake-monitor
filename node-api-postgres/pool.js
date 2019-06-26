const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'https://smart-brake-monitor-server.herokuapp.com',
    database: 'brakessupreme',
    password: 'password',
    port: process.env.PORT || 5432,
});

module.exports = pool;
