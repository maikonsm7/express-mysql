const mysql = require('mysql') // drive

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerceDB'
})

module.exports = pool

