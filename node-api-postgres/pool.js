const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'kkqqolcpdlnpey',
    host: 'ec2-174-129-227-51.compute-1.amazonaws.com',
    database: 'dec41j9t9a095o',
    password: '846fcd65de18b2d7ff2e268f0de72c41568a307d32ca354a47857f66e1f68b26',
    port: 5432,
});

module.exports = pool;
