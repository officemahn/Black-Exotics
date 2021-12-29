const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'BlackExoticsDB',
  password: 'postgres',
  port: 5433
});

// TODO: USE ENV variables to store values above
module.exports = {
  query: (text, params, callback) => {
    // const start = Date.now()
    return pool.query(text, params, (err, res) => {
      // const duration = Date.now() - start
      // console.log('executed query', { text, duration, rows: res })
      callback(err, res)
    })
  },
}