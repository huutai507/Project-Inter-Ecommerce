/* eslint-disable prefer-const */
import sha1 from 'sha1';
import { validationResult } from 'express-validator/check';
import connectDB from '../config/connectDB';

// views all user
module.exports.viewUser = (req, res) => {
  const pages = parseInt(req.query.page) || 1;
  const limit = 6;
  const offset = (pages - 1) * limit;
  connectDB.query(
    'SELECT * FROM `tbl_users` LIMIT ? OFFSET ?; SELECT * FROM tbl_users', [limit, offset],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      else res.render('manage/user/index', {
        user: result[0],
        usersAll: result[1],
        page: pages,
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess: 0
      });
    }
  );
};

// views an user
module.exports.getID = (req, res) => {
  connectDB.query(
    'SELECT * FROM `tbl_users` WHERE id = ?', [req.params.id],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      else res.send(result);
    }
  );
};
//get update user
module.exports.getUpdateUser = (req, res) => {

  let id = req.params.id;
  let findUser = 'SELECT * FROM tbl_users WHERE id = ?';
  connectDB.query(findUser, [id], (err, result) => {
    if (err) {
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    }
    res.render('manage/user/informationUser', {
      inforUser: result[0],
      errors: req.flash('errors'),
      permission: req.session.permission,
      name: req.session.account,
      loginsuccess: 0

    })
  })
};

// update user
module.exports.updateUser = (req, res) => {

  const emp = req.body;
  let id = req.params.id;
  let errorArr = [];
  let successArr = [];
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    const errors = Object.values(validationErros.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash('errors', errorArr);
    return res.redirect('/user/update/' + id);
  }
  connectDB.query(
    'UPDATE `tbl_users` SET `userName`=?,`phone`=?,`permission`=?,`email`=? WHERE id = ?', [emp.userName, emp.phone, emp.permission, emp.email, id],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'

        });
      successArr.push(`Update successful`);
      req.flash('success', successArr);
      res.redirect('/user');
    }
  );
};
// set Defaul Passowrd
module.exports.setDefaulPassword = (req, res) => {
  const hashPassword = sha1('123456aA@');
  let id = req.params.id;
  let successArr = [];
  connectDB.query(
    ` SELECT * FROM tbl_users where id= ?;UPDATE tbl_users SET password= ? WHERE id = ?`, [id, hashPassword, id],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'

        });
      successArr.push(`Set Password: ${result[0][0].account} as 123456aA@`);
      req.flash('success', successArr);
      res.redirect('/user');
    }
  );
};
// Delete an user
module.exports.deleteUser = (req, res) => {
  let id = req.params.id;
  connectDB.query(
    'SELECT * FROM tbl_users where id= ? ; DELETE FROM `tbl_users` WHERE id = ?', [id, id],
    (err, result) => {
      try {
        req.flash('success', `Deleted:  ${result[0][0].account}`);
        res.redirect('/user')
      } catch (error) {
        console.log(error)
      }
    }
  );
};
// get change Password
module.exports.getChangePassword = (req, res) => {
  res.render('manage/user/changePassword', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    permission: req.session.permission,
    name: req.session.account,
    loginsuccess: 0
  })
};
// Update Password
module.exports.changePassword = (req, res) => {
  const oldPassword = sha1(req.body.oldPassword);
  const newPassword = sha1(req.body.password);
  const account = req.session.account;
  let errorArr = [];
  let successArr = [];
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    const errors = Object.values(validationErros.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash('errors', errorArr);
    return res.redirect('/user/change-password');
  }
  connectDB.query(
    'SELECT password FROM `tbl_users` WHERE account = ?', [account],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      if (result[0].password !== oldPassword) {
        errorArr.push('Old password incorrect !!!');
        req.flash('errors', errorArr);
        return res.redirect('/user/change-password');
      }
      connectDB.query('UPDATE `tbl_users` SET `password`= ?  WHERE account = ?', [newPassword, account]);
      successArr.push(`Update successful`);
      req.flash('success', 'Change password successfully');
      res.redirect('/user/change-password');
    }
  );
};
// get update-infor-user
module.exports.getUpdateInfor = (req, res) => {
  let account = req.session.account;
  let sql = 'SELECT * FROM tbl_users WHERE account = ?';
  connectDB.query(sql, [account], (err, result) => {
    if (err) {
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    }
    res.render('manage/user/updateInfo', {
      inforUser: result[0],
      errors: req.flash('errors'),
      success: req.flash('success'),
      permission: req.session.permission,
      name: req.session.account,
      loginsuccess: 0
    })
  })
}
// update Info-user
module.exports.updateInfoUser = (req, res) => {
  const emp = req.body;
  let id = req.params.id;
  let errorArr = [];
  let successArr = [];
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    const errors = Object.values(validationErros.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash('errors', errorArr);
    return res.redirect('/user/update-info');
  }
  connectDB.query(
    'UPDATE `tbl_users` SET `userName`=?,`phone`=?,`email`=? WHERE id = ?', [emp.userName, emp.phone, emp.email, id],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      successArr.push(`Update successful`);
      req.flash('success', successArr);
      res.redirect('/user/update-info');
    }
  );
};
// search User
module.exports.searchUser = (req, res) => {
  let errorArr = [];
  const pages = parseInt(req.query.page) || 1;
  const limit = 6;
  const offset = (pages - 1) * limit;
  const search = req.query.key;
  const nameTable = ['tbl_users'];
  const name = [`userName LIKE '%${search}%' OR account LIKE '%${search}%'`];
  connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    if (result[0].length === 0) {
      errorArr.push('User not found...');
      req.flash('errors', errorArr);
      return res.redirect('/user');
    }
    res.render('manage/user/search', {
      user: result[0],
      search: search,
      page: pages,
      usersAll: result[1],
      errors: req.flash('errors'),
      success: req.flash('success'),
      permission: req.session.permission,
      name: req.session.account,
      loginsuccess: 0

    });
  })
};