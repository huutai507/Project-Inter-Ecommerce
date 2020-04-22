
import session from 'express-session';


const configSS = app => {
  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: process.env.SS_SECRET,
      cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
    })
  );
};

module.exports = configSS;