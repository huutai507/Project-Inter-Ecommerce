module.exports.requireAuth = (req, res, next) => {
    if (!req.session.account) {
        res.redirect('/auth/login');
        return;
    }
    next();
};
module.exports.isAuth = (req, res, next) => {
    if (req.session.account) {
        res.redirect('/admin');
        return;
    }
    next();
};