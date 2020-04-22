import connectDB from '../config/connectDB';

module.exports.requireAuth = (req, res, next) => {
    if (!req.session.account) {
        console.log('not session', req.session.account)
        return res.json({ notSession: true })
    }
    next();
};
module.exports.isAuth = (req, res, next) => {
    if (req.session.account) {
        console.log('session', req.session.account)
        return res.json({ Session: true })
    }
    next();
};