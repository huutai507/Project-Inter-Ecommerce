require('dotenv').config();
import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.DB_HOST, // localhost
    user: process.env.DB_USER, // username
    port: 3306,
    password: process.env.DB_PASSWORD, // pass
    database: process.env.DB_DATABASE, // Db_name
    multipleStatements: true
});
connection.connect(err => {
    if (err) throw console.log(err);
    console.log('Database Connected!!!');
});

module.exports = connection;