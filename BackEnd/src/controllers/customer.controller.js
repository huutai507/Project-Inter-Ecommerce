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
    let [customers, customersAll] = [result[0], result[1]];
    res.json({ customers, customersAll, page: pages, loginsuccess: 0 })
  });
};

// delete customer
module.exports.deleteCustomer = (req, res) => {
  let id = req.params.id;
  let errorArr = [];
  let successArr = [];
  connectDB.query(
    'SELECT  `customerName` FROM `tbl_customers` WHERE id = ? ; DELETE FROM `tbl_customers` WHERE id = ?  ', [id, id],
    (err, result) => {
      if (err) {
        errorArr.push(
          `Cannot be deleted "${result[0][0].customerName}"`
        );
        return res.json({ errorArr: errorArr });
      }
      successArr.push(`Delete "${result[0][0].customerName}" successful`);
      res.json({ successArr: successArr });
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
    }
    res.json({ customer: result, loginsuccess: 0 })
  });
};
// update Customer
module.exports.updateCustomer = (req, res) => {
  const emp = req.body;
  let id = req.params.id;
  let successArr = [];
  connectDB.query(
    'UPDATE `tbl_customers` SET `customerName`= ?,`birthday`= ?,`gender`= ? ,`address`=? ,`phone`=?,`email`=? WHERE id =?',
    [emp.customerName, emp.birthday, emp.gender, emp.address, emp.phone, emp.email, id],
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

// search customer
module.exports.searchCustomer = (req, res) => {
  let errorArr = [];
  const pages = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (pages - 1) * limit;
  const search = req.query.key;
  const nameTable = ['tbl_customers'];
  const name = [`customerName LIKE '%${search}%' OR phone LIKE '%${search}%' OR email LIKE '%${search}%' OR address LIKE '%${search}%'`];
  connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: 'Fail to query database'
      });
    if (result[0].length === 0) {
      errorArr.push('Customer not found...');
      return res.json({ errorArr: errorArr });
    }
    res.json({
      customer: result[0],
      search: search,
      page: pages,
      customerAll: result[1],
      loginsuccess: 0
    });
  })
};