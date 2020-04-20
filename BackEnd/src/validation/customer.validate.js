import { check } from 'express-validator';

// check name not null
const checkName = check('customerName', 'Please enter your name').trim().notEmpty();
const checkBirthday = check('birthday', 'Please select your birthday')
  .trim()
  .notEmpty();
// check gender wrong choose
const checkGender = check('gender', 'Gender: Male or Female')
  .notEmpty()
  .isIn(['Male', 'Female']);
//   check address not null
const checkAddress = check('address', 'Please enter your address').trim().notEmpty();
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
// check Email
const checkEmail = check('email', 'Email like : example@gmail.com')
  .isEmail()
  .trim();

module.exports.createCustomer = [
  checkName,
  checkGender,
  checkAddress,
  checkBirthday,
  checkPhone,
  checkEmail
];

module.exports.updateCustomer = [
  checkName,
  checkGender,
  checkAddress,
  checkBirthday,
  checkPhone,
  checkEmail
];
