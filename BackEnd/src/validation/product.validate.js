import { check } from 'express-validator/check';

const checkName = check('productName', 'Enter the product name').trim().notEmpty();
const checkColor = check('color', 'Enter the product color').trim().notEmpty();
const checkPrice = check('price', 'Price must be a number')
  .notEmpty()
  .isNumeric();
const checkPromotion = check('promotion', 'Promotion must be a number')
  .notEmpty()
  .isNumeric();
const checkPromotion1 = check('promotion', 'Promotion price must be less than the Price').custom((value, { req }) => {
  return value < parseInt(req.body.price);
});
const checkOrigin = check('country', 'Enter the Origin').trim().notEmpty();
const checkBrand = check('brandId', 'Choose a brand').not().isIn('Choose...');
const checkCategory = check('categoryId', 'Choose a category').not().isIn('Choose...');
const checkImage = check('image', 'Choose image for product').notEmpty();

module.exports.product = [
  checkName,
  checkColor,
  checkPrice,
  checkPromotion,
  checkPromotion1,
  checkOrigin,
  checkBrand,
  checkCategory
];
