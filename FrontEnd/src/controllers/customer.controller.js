import { validationResult } from 'express-validator/check';
import axios from 'axios';
const API_URL = process.env.API_URL || 'http://localhost:4500'

//get customer  view customers`${API_URL}
module.exports.getCustomer = (req, res) => {
  let pages = req.query.page;
  axios.get(`${API_URL}/customer?page=${pages}`)
    .then((response) => {
      let { customers, customersAll, page, loginsuccess } = response.data;
      res.render('manage/customer/index', {
        customers,
        customersAll,
        page,
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        loginsuccess,
        name: req.session.account
      })
    }).catch((error) => {
      console.log('adad')
      res.redirect('/customer');
    })
};

// delete customer
module.exports.deleteCustomer = (req, res) => {
  let id = req.params.id;
  axios.get(`${API_URL}/customer/delete/${id}`)
    .then((response) => {
      let { successArr, errorArr } = response.data;
      if (errorArr) {
        req.flash('errors', errorArr);
        return res.redirect('/customer')
      }
      if (successArr) {
        req.flash('success', successArr);
        return res.redirect('/customer')
      }
    }).catch((error) => {
      res.redirect('/customer')
    })
};


// get update
module.exports.getUpdateCustomer = (req, res) => {
  let id = req.params.id;
  axios.get(`${API_URL}/customer/update/${id}`)
    .then((response) => {
      let { customer, loginsuccess } = response.data;
      res.render('manage/customer/informationCustomer', {
        customer,
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess
      })
    }).catch((error) => {
      res.redirect('/customer')
    })
};
// update Customer
module.exports.updateCustomer = (req, res) => {
  let values = req.body;
  let id = req.params.id;
  let errorArr = [];
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    const errors = Object.values(validationErros.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash('errors', errorArr);
    return res.redirect('/customer/update/' + id);
  }
  axios.post(`${API_URL}/customer/update/${id}`, values)
    .then((response) => {
      let { successArr, errorArr } = response.data;
      if (errorArr) {
        req.flash('errors', errorArr);
        return res.redirect('/customer/update/' + id)
      }
      if (successArr) {
        req.flash('success', successArr);
        return res.redirect('/customer')
      }
    }).catch((error) => {
      res.redirect('/customer')
    })
};

// search customer
module.exports.searchCustomer = (req, res) => {
  const page = req.query.page;
  const search = req.query.key;
  axios.get(`${API_URL}/customer/search?key=${search}&page=${page}`)
    .then((response) => {
      let { errorArr } = response.data;
      if (errorArr) {
        req.flash('errors', errorArr);
        return res.redirect('/customer')
      }
      let { customer, search, page, customerAll, loginsuccess } = response.data;
      return res.render('manage/customer/search', {
        customer,
        search,
        page,
        customerAll,
        permission: req.session.permission,
        name: req.session.account,
        errors: req.flash('errors'),
        loginsuccess
      })
    }).catch((error) => {
      res.redirect('/customer')
    })
};