const pg = require('pg');
const db = new pg.Pool({
    host: 'SERVER_IP',
    database: 'DB_NAME',
    user: 'USER',
    password: 'DB_PASS',
    port: '5432'
});