module.exports.requireManage = (req, res, next) => {
    if (req.session.permission !== 'MANAGE') {
        res.redirect('/admin');
        return;
    }
    next();
};