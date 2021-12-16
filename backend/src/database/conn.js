'use strict';
require('dotenv').config()
// const pg = require('pg')

// var con = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.PORT,
// })

const Pool = require('pg').Pool
const con = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pgpass',
  port: 5432,
})

module.exports = con;
