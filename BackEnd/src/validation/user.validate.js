import { check } from 'express-validator/check';

// check Name
const checkName = check('userName', 'Please enter your name').trim().notEmpty();
// check Account
const checkAccount = check('account', 'Please enter your account').trim().notEmpty();
// check Permission
const checkPermission = check('permission', 'Permisson: Staff or Manager').isIn(['STAFF', 'MANAGE']);
// check Email
const checkEmail = check('email', 'Email like: example@gmail.com')
  .isEmail()
  .trim();
// check Phone
const checkPhone = check(
  'phone',
  'Please check your phone number'
)
  .isLength({
    max: 11,
    min: 10
  }).trim()
  .isNumeric()
  .notEmpty();
// check Password
const checkPassword = check(
  'password',
  'Password includes uppercase, lowercase letters, special characters and at least 8 characters'
)
  .isLength({
    min: 8
  })
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
// check password confirm
const checkPasswordConfirm = check('confirmPassword', 'Confirm password incorrect').custom(
  (value, { req }) => {
    return value === req.body.password;
  }
);
module.exports.createUser = [
  checkName,
  checkPermission,
  checkAccount,
  checkEmail,
  checkPhone,
  checkPassword
];
module.exports.updateUser = [
  checkName,
  checkPhone,
  checkEmail,
  checkPermission,
];
module.exports.updateInfoUser = [
  checkName,
  checkPhone,
  checkEmail,
];
module.exports.changePassword = [checkPassword, checkPasswordConfirm];
