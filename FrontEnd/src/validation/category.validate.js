import { check } from 'express-validator';

const checkName = check(
  'categoryName',
  'Please enter category name'
).trim().notEmpty();

module.exports.category = [checkName];
