import { check } from 'express-validator';

const checkName = check('brandName', 'Enter the brand name').trim().notEmpty();

module.exports.brand = [checkName];
