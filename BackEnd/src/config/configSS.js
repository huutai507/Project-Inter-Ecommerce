require('dotenv').config();
import session from 'express-session';
import MySQLStore from 'express-mysql-session';

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const sessionStore = new MySQLStore(options);
const configSS = app => {
    app.use(
        session({
            resave: true,
            saveUninitialized: false,
            store: sessionStore,
            secret: process.env.SS_SECRET,
            cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
        })
    );
};

module.exports = configSS;