import sha1 from 'sha1';
import connectDB from '../config/connectDB';
import { validationResult } from 'express-validator/check';

module.exports.login = function(req, res) {
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
                let errorArr = [];
                if (!result[0].length) {
                    errorArr.push('Acount does not exist !!!');
                    req.flash('errors', errorArr);
                    return res.redirect('/auth/login');
                }
                if (result[0][0].password !== hashPassword) {
                    errorArr.push('Wrong account or password !!!');
                    req.flash('errors', errorArr);
                    return res.redirect('/auth/login');
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
                req.flash('success', `Welcome back <span style="color: red"> ${accountName} </span> !!!`);
                res.render('manage/index', {
                    loginsuccess: req.flash('success'),
                    permission: result[0][0].permission,
                    name: accountName
                });
            }
        }
    );
};
// register

module.exports.register = (req, res) => {
    res.render('./auth/register', {
        errors: req.flash('errors'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess: 0
    });
};
// register user Post
module.exports.createRegister = (req, res) => {
    let errorArr = [];
    let successArr = [];
    const validationErros = validationResult(req);
    const emp = req.body;
    // const permission = 'NHANVIEN';
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
                errorArr.push('The account already exists!!!');
                req.flash('errors', errorArr);
                return res.redirect('/auth/register');
            }
            // handle errors data insert 
            if (!validationErros.isEmpty()) {
                const errors = Object.values(validationErros.mapped());
                errors.forEach(item => {
                    errorArr.push(item.msg);
                });
                req.flash('errors', errorArr);
                return res.redirect('/auth/register');
            } else {
                connectDB.query(
                    'INSERT INTO `tbl_users`(`userName`, `phone`, `account`, `password`,`permission`,`email`) VALUES (?)', [values]
                );
                successArr.push('Register success!!!');
                req.flash('success', successArr);
                res.redirect('/user');
            }
        }
    );
};

// Logout
module.exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/auth/login');
};