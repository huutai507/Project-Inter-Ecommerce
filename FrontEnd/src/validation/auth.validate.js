import { check } from 'express-validator/check';

// check Name
const checkName = check('userName', 'Please enter your name').trim().notEmpty();
// check Account
const checkAccount = check(
  'account',
  'Please enter your account and  not uppercase characters'
).trim()
  .notEmpty()
  .isLowercase();
// check Permission
const checkPermission = check('permission', 'Please choose Permisson').trim().isIn(['STAFF', 'MANAGE']).not().isIn('Choose...');
// check Email
const checkEmail = check('email', 'Email like : example@gmail.com')
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
).isLength({
  min: 8
})
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
// check password confirm
const checkConfirmPassword = check(
  'confirmPassword',
  'Incorrect password confirmation'
).custom((value, { req }) => {
  return value === req.body.password;
});
module.exports.createRegister = [
  checkName,
  checkPhone,
  checkEmail,
  checkPermission,
  checkAccount,
  checkPassword,
  checkConfirmPassword
];
module.exports.updateURegister = [
  checkEmail,
  checkPhone,
  // checkPermission,
  checkName
];
module.exports.changePassword = [checkPassword];
