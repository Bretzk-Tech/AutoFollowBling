const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '28102003',
  database: 'AutoFllow'
})

module.exports = pool
