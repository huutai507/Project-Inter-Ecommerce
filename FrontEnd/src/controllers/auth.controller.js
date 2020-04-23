
import axios from 'axios';
module.exports.login = function (req, res) {
    axios.get('http://localhost:4500/auth/login')
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
    axios.post('http://localhost:4500/auth/login', {
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
    res.render('./auth/register', {
        errors: req.flash('errors'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess: 0
    });
};
// register user Post
module.exports.createRegister = (req, res) => {
    // let errorArr = [];
    // let successArr = [];
    // const validationErros = validationResult(req);
    // const emp = req.body;
    // // const permission = 'NHANVIEN';
    // const hashPassword = sha1(emp.password);
    // const values = [
    //     emp.userName,
    //     emp.phone,
    //     emp.account,
    //     hashPassword,
    //     emp.permission,
    //     emp.email
    // ];
    // const accounts = req.body.account;
    // connectDB.query(
    //     'SELECT account FROM tbl_users WHERE account = ?', [accounts],
    //     (err, rows) => {
    //         if (err) {
    //             res.status(400).send({
    //                 status: 400,
    //                 message: 'Fail to query database'
    //             });
    //         }
    //         if (rows.length) {
    //             errorArr.push('The account already exists!!!');
    //             req.flash('errors', errorArr);
    //             return res.redirect('/auth/register');
    //         }
    //         // handle errors data insert 
    //         if (!validationErros.isEmpty()) {
    //             const errors = Object.values(validationErros.mapped());
    //             errors.forEach(item => {
    //                 errorArr.push(item.msg);
    //             });
    //             req.flash('errors', errorArr);
    //             return res.redirect('/auth/register');
    //         } else {
    //             connectDB.query(
    //                 'INSERT INTO `tbl_users`(`userName`, `phone`, `account`, `password`,`permission`,`email`) VALUES (?)', [values]
    //             );
    //             successArr.push('Register success!!!');
    //             req.flash('success', successArr);
    //             res.redirect('/user');
    //         }
    //     }
    // );
};

// Logout
module.exports.logout = (req, res) => {
    req.session.destroy(err => {
    });
    res.redirect('/auth/login')
};