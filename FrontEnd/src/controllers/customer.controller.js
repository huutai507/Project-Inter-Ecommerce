import { validationResult } from 'express-validator/check';
import connectDB from '../config/connectDB';


//get customer  view customers
module.exports.getCustomer = (req, res) => {
  const pages = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (pages - 1) * limit;
  let sql = `SELECT * FROM tbl_customers LIMIT ? OFFSET ? ; SELECT * FROM tbl_customers`;
  connectDB.query(sql, [limit, offset], (err, result) => {
    if (err) {
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    }
    res.render('manage/customer/index', {
      customers: result[0],
      customersAll: result[1],
      page: pages,
      success: req.flash('success'),
      errors: req.flash('errors'),
      permission: req.session.permission,
      name: req.session.account,
      loginsuccess: 0
    });
  });
};

// delete customer
module.exports.deleteCustomer = (req, res) => {
  let id = req.params.id;
  let successArr = [];
  connectDB.query(
    'SELECT  `customerName` FROM `tbl_customers` WHERE id = ? ; DELETE FROM `tbl_customers` WHERE id = ?  ', [id, id],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      successArr.push(`Delete "${result[0][0].customerName}" successful`);
      req.flash('success', successArr);
      res.redirect('/customer');
    }
  );
};


// get update
module.exports.getUpdateCustomer = (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM tbl_customers WHERE id = ?';
  connectDB.query(sql, [id], (err, result) => {
    if (err) {
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    } else {
      res.render('manage/customer/informationCustomer', {
        customer: result,
        errors: req.flash('errors'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess: 0
      });
    }
  });
};
// update Customer
module.exports.updateCustomer = (req, res) => {
  const emp = req.body;
  let id = req.params.id;
  const errorArr = [];
  let successArr = [];
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    const errors = Object.values(validationErros.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash('errors', errorArr);
    return res.redirect('/customer/update/' + id);
  }
  // query
  connectDB.query(
    'UPDATE `tbl_customers` SET `customerName`= ?,`birthday`= ?,`gender`= ? ,`address`=? ,`phone`=?,`email`=? WHERE id =?',
    [emp.customerName, emp.birthday, emp.gender, emp.address, emp.phone, emp.email, id],
    (err, result) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      successArr.push(`Update successful`);
      req.flash('success', successArr);
      res.redirect('/customer');
    }
  );
};

// search customer
module.exports.searchCustomer = (req, res) => {
  let errorArr = [];
  const pages = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (pages - 1) * limit;
  const search = req.query.key;
  const nameTable = ['tbl_customers'];
  const name = [`customerName LIKE '%${search}%'`];
  connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    if (result[0].length === 0) {
      errorArr.push('Customer not found...');
      req.flash('errors', errorArr);
      return res.redirect('../customer');
    } else
      res.render('manage/customer/search', {
        customer: result[0],
        search: search,
        page: pages,
        customerAll: result[1],
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess: 0
      });
  });
};