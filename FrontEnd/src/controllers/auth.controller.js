
import axios from 'axios';
import { validationResult } from 'express-validator/check';
const API_URL = process.env.API_URL || 'localhost:4500'
module.exports.login = function (req, res) {
    axios.get(`${API_URL}/auth/login`)
        .then(() => {
            res.render('./auth/login', {
                errors: req.flash('errors')
            })
        })
        .catch(() => {
            res.render('auth/login', {
                errors: req.flash('errors')
            })
        })

};
module.exports.loginPost = (req, res) => {
    const { account, password } = req.body
    axios.post(`${API_URL}/auth/login`, {
        account, password
    }).then((response) => {
        let errorArr = [];
        let { notSession } = response.data;
        let { Session } = response.data;
        let { accountNotExist } = response.data;
        let { wrongPassword } = response.data;
        let { permission,
            name,
            countUser,
            newOrder,
            customer,
            total,
            accountSS,
            permissionSS
        } = response.data
        if (Session) {
            res.redirect('/admin')
        }
        if (notSession) {
            res.redirect('/auth')
        }
        if (accountNotExist) {
            errorArr.push('Acount does not exist !!!');
            req.flash('errors', errorArr);
            return res.redirect('/auth/login');
        }
        if (wrongPassword) {
            errorArr.push('Wrong account or password !!!');
            req.flash('errors', errorArr);
            return res.redirect('/auth/login');
        }
        if (permission) {
            req.session.account = accountSS;
            req.session.permission = permissionSS;
            req.flash('success', `Welcome back <span style="color: red"> ${name} </span> !!!`);
            res.render('manage/index', {
                loginsuccess: req.flash('success'),
                permission,
                name,
                countUser,
                newOrder,
                customer,
                total
            })
        }
    }).catch((error) => {
        // console.log('this is error', error)
    })

};
// register

module.exports.register = (req, res) => {
    axios.get(`${API_URL}/auth/register`)
        .then((response) => {
            let { loginsuccess } = response.data
            res.render('auth/register', {
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess,
                errors: req.flash('errors')
            })
        })

};
// register user Post
module.exports.createRegister = (req, res) => {
    let errorArr = [];
    let successArr = [];
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect('/auth/register');
    }
    axios.post(`${API_URL}/auth/register`, req.body)
        .then((response) => {
            let { accountExist, successRegister } = response.data
            if (accountExist) {
                errorArr.push('The account already exists!!!');
                req.flash('errors', errorArr);
                return res.redirect('/auth/register');
            }
            if (successRegister) {
                successArr.push('Register success!!!');
                req.flash('success', successArr);
                res.redirect('/user');
            }
        })
};

// Logout
module.exports.logout = (req, res) => {
    req.session.destroy(err => {
    });
    res.redirect('/auth/login')
};