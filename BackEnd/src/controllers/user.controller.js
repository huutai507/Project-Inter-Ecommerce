/* eslint-disable prefer-const */
import sha1 from 'sha1';
import connectDB from '../config/connectDB';

// views all user
module.exports.viewUser = (req, res) => {
  const pages = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (pages - 1) * limit;
  let sql = 'SELECT * FROM `tbl_users` LIMIT ? OFFSET ?; SELECT * FROM tbl_users';
  connectDB.query(sql, [limit, offset], (err, result) => {
    if (err) {
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    }
    let [user, usersAll] = [result[0], result[1]];
    res.json({ user, usersAll, page: pages, loginsuccess: 0 })
  });
};

//get update user
module.exports.getUpdateUser = (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM tbl_users WHERE id = ?';
  connectDB.query(sql, [id], (err, result) => {
    if (err) {
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    }
    res.json({ inforUser: result, loginsuccess: 0 })
  });
};

// update user
module.exports.updateUser = (req, res) => {
  const emp = req.body;
  let id = req.params.id;
  let successArr = [];
  connectDB.query(
    'UPDATE `tbl_users` SET `userName`=?,`phone`=?,`permission`=?,`email`=? WHERE id = ?',
    [emp.userName, emp.phone, emp.permission, emp.email, id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      successArr.push(`Update successful`);
      res.json({ successArr: successArr });
    }
  );
};
// set Defaul Passowrd
module.exports.setDefaulPassword = (req, res) => {
  const hashPassword = sha1('123456aA@');
  let id = req.params.id;
  let successArr = [];
  connectDB.query(
    ` SELECT * FROM tbl_users where id= ?; UPDATE tbl_users SET password= ? WHERE id = ?`, [id, hashPassword, id],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'

        });
      successArr.push(`Set Password: ${result[0][0].account} as 123456aA@`);
      res.json({ successArr: successArr })
    }
  );
};
// Delete an user
module.exports.deleteUser = (req, res) => {
  let id = req.params.id;
  let successArr = [];
  connectDB.query(
    'SELECT * FROM tbl_users where id= ? ; DELETE FROM `tbl_users` WHERE id = ?', [id, id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      successArr.push(`Deleted account:  ${result[0][0].account}`);
      res.json({ successArr: successArr });
    }
  );
};
// get change Password
module.exports.getChangePassword = (req, res) => {
  res.json({ loginsuccess: 0 });
};
// Update Password
module.exports.changePassword = (req, res) => {
  const oldPassword = sha1(req.body.values.oldPassword);
  const newPassword = sha1(req.body.values.password);
  const account = req.body.account;
  let successArr = [];
  let errorArr = [];
  connectDB.query(
    'SELECT password FROM `tbl_users` WHERE account = ?', [account],
    (err, result) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      if (result[0].password !== oldPassword) {
        errorArr.push('Old password incorrect !!!');
        return res.json({ errorArr: errorArr });;
      }
      connectDB.query('UPDATE `tbl_users` SET `password`= ?  WHERE account = ?', [newPassword, account]);
      successArr.push(`Change password successfully`);
      res.json({ successArr: successArr });
    }
  );
};
// get update-infor-user
module.exports.getUpdateInfor = (req, res) => {
  const account = req.params.id;
  let sql = 'SELECT * FROM tbl_users WHERE account = ?';
  connectDB.query(sql, [account], (err, result) => {
    if (err) {
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    }
    res.json({ inforUser: result[0], loginsuccess: 0 })
  });
};
// update Info-user
module.exports.updateInfoUser = (req, res) => {
  const emp = req.body;
  let id = req.params.id;
  let successArr = [];
  connectDB.query(
    'UPDATE `tbl_users` SET `userName`=?,`phone`=?,`email`=? WHERE id = ?',
    [emp.userName, emp.phone, emp.email, id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      successArr.push(`Update successful`);
      res.json({ successArr: successArr });
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
  const name = [`userName LIKE '%${search}%' OR account LIKE '%${search}%' OR phone  LIKE '%${search}%' OR email LIKE '%${search}%'`];
  connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    if (result[0].length === 0) {
      errorArr.push('User not found...');
      return res.json({ errorArr: errorArr });
    }
    res.json({
      user: result[0],
      search: search,
      page: pages,
      usersAll: result[1],
      loginsuccess: 0
    });
  })
};