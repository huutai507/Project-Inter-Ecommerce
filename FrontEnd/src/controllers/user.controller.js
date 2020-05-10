/* eslint-disable prefer-const */
import { validationResult } from 'express-validator/check';
import axios from 'axios'
const API_URL = process.env.API_URL || 'http://localhost:4500'
// views all user
module.exports.viewUser = (req, res) => {
  let pages = req.query.page;
  axios.get(`${API_URL}/user?page=${pages}`)
    .then((response) => {
      let { user, usersAll, page, loginsuccess } = response.data;
      res.render('manage/user/index', {
        user,
        usersAll,
        page,
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        loginsuccess,
        name: req.session.account
      })
    }).catch((error) => {
      res.redirect('/user');
    })
};

//get update user
module.exports.getUpdateUser = (req, res) => {
  let id = req.params.id;
  axios.get(`${API_URL}/user/update/${id}`)
    .then((response) => {
      let { inforUser, loginsuccess } = response.data;
      res.render('manage/user/informationUser', {
        inforUser,
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess
      })
    }).catch((error) => {
      res.redirect('/user')
    })
};

// update user
module.exports.updateUser = (req, res) => {
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
    return res.redirect('/user/update/' + id);
  }
  axios.post(`${API_URL}/user/update/${id}`, values)
    .then((response) => {
      let { successArr, errorArr } = response.data;
      if (errorArr) {
        req.flash('errors', errorArr);
        return res.redirect('/user/update/' + id)
      }
      if (successArr) {
        req.flash('success', successArr);
        return res.redirect('/user')
      }
    }).catch((error) => {
      res.redirect('/user')
    })
};
// set Defaul Passowrd
module.exports.setDefaulPassword = (req, res) => {
  let id = req.params.id;
  axios.post(`${API_URL}/user/set-password/${id}`)
    .then((response) => {
      let { successArr } = response.data;
      req.flash('success', successArr);
      return res.redirect('/user')
    }).catch((error) => {
      res.redirect('/user')
    })
};
// Delete an user
module.exports.deleteUser = (req, res) => {
  let id = req.params.id;
  axios.get(`${API_URL}/user/delete/${id}`)
    .then((response) => {
      let { successArr } = response.data;
      req.flash('success', successArr);
      return res.redirect('/user')
    }).catch((error) => {
      res.redirect('/user')
    })
};
// get change Password
module.exports.getChangePassword = (req, res) => {
  axios.get(`${API_URL}/user/change-password/`)
    .then((response) => {
      let { loginsuccess } = response.data;
      res.render('manage/user/changePassword', {
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess
      })
    }).catch((error) => {
      res.redirect('/user')
    })
};
// Update Password
module.exports.changePassword = (req, res) => {
  let values = req.body;
  const account = req.session.account;
  let errorArr = [];
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    const errors = Object.values(validationErros.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash('errors', errorArr);
    return res.redirect('/user/change-password/');
  }
  axios.post(`${API_URL}/user/change-password/`, { values, account })
    .then((response) => {
      let { successArr, errorArr } = response.data;
      if (errorArr) {
        req.flash('errors', errorArr);
        return res.redirect('/user/change-password/')
      }
      if (successArr) {
        req.flash('success', successArr);
        return res.redirect('/user/change-password/')
      }
    }).catch((error) => {
      res.redirect('/user')
    })
};
// get update-infor-user
module.exports.getUpdateInfor = (req, res) => {
  const account = req.session.account;
  axios.get(`${API_URL}/user/update-info/${account}`)
    .then((response) => {
      let { inforUser, loginsuccess } = response.data;
      res.render('manage/user/updateInfo', {
        inforUser,
        errors: req.flash('errors'),
        success: req.flash('success'),
        permission: req.session.permission,
        name: req.session.account,
        loginsuccess
      })
    }).catch((error) => {
      res.redirect('/user');
    })
}
// update Info-user
module.exports.updateInfoUser = (req, res) => {
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
    return res.redirect('/user/update-info');
  }
  axios.post(`${API_URL}/user/update-info/${id}`, values)
    .then((response) => {
      let { successArr, errorArr } = response.data;
      if (errorArr) {
        req.flash('errors', errorArr);
        return res.redirect('/user/update-info')
      }
      if (successArr) {
        req.flash('success', successArr);
        return res.redirect('/user/update-info')
      }
    }).catch((error) => {
      res.redirect('/user')
    })
};
// search User
module.exports.searchUser = (req, res) => {
  const page = req.query.page;
  const search = req.query.key;
  axios.get(`${API_URL}/user/search?key=${search}&page=${page}`)
    .then((response) => {
      let { errorArr } = response.data;
      if (errorArr) {
        req.flash('errors', errorArr);
        return res.redirect('/user')
      }
      let { user, search, page, usersAll, loginsuccess } = response.data;
      return res.render('manage/user/search', {
        user,
        search,
        page,
        usersAll,
        permission: req.session.permission,
        name: req.session.account,
        errors: req.flash('errors'),
        loginsuccess
      })
    }).catch((error) => {
      res.redirect('/user')
    })
};