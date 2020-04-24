import sha1 from 'sha1';
import connectDB from '../config/connectDB';
import { validationResult } from 'express-validator/check';

module.exports.login = function (req, res) {
    res.render('./auth/login', {
        errors: req.flash('errors'),
    });
};
module.exports.loginPost = (req, res) => {
    const accountName = req.body.account;
    const hashPassword = sha1(req.body.password);
    connectDB.query(
        `SELECT account, password, permission FROM tbl_users WHERE account= ?; SELECT * FROM tbl_users; SELECT * FROM tbl_orders WHERE status= 'new'; SELECT * FROM tbl_paymentinfo; SELECT * FROM tbl_customers`, [accountName],
        (err, result) => {
            if (err)
                res.status(400).send({
                    status: 400,
                    message: 'Fail to query database'
                });
            else {

                if (!result[0].length) {
                    res.json({ accountNotExist: true });
                    return;
                }
                if (result[0][0].password !== hashPassword) {
                    res.json({ wrongPassword: true });
                    return;
                }
                res.locals.countUser = result[1].length;
                res.locals.newOrder = result[2].length;
                res.locals.customer = result[3].length;
                let amount = 0;
                result[3].forEach(item => {
                    amount += item.totalPayment;
                });;
                res.locals.total = amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                req.session.account = accountName;
                req.session.permission = result[0][0].permission;
                res.json({
                    permission: result[0][0].permission,
                    name: accountName,
                    countUser: res.locals.countUser,
                    newOrder: res.locals.newOrder,
                    customer: res.locals.customer,
                    total: res.locals.total,
                    accountSS: req.session.account,
                    permissionSS: result[0][0].permission

                })
            }
        }
    );
};
// register

module.exports.register = (req, res) => {
    res.json({
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess: 0
    })
};
// register user Post
module.exports.createRegister = (req, res) => {
    const emp = req.body;
    const hashPassword = sha1(emp.password);
    const values = [
        emp.userName,
        emp.phone,
        emp.account,
        hashPassword,
        emp.permission,
        emp.email
    ];
    const accounts = req.body.account;
    connectDB.query(
        'SELECT account FROM tbl_users WHERE account = ?', [accounts],
        (err, rows) => {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: 'Fail to query database'
                });
            }
            if (rows.length) {
                res.json({ accountExist: true });
                return;
            }

            connectDB.query(
                'INSERT INTO `tbl_users`(`userName`, `phone`, `account`, `password`,`permission`,`email`) VALUES (?)', [values]
            );
            res.json({ successRegister: true })
            return
        }
    );
};

// Logout
module.exports.logout = (req, res) => {
    req.session.destroy(err => {
        console.log('delete', err)
    });
};