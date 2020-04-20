import connectDB from '../config/connectDB';

// CHECK product name already exists INSERT
module.exports.productNameInsert = (req, res, next) => {
  const temp = req.body;
  const productName = temp.productName;
  const brandId = temp.brandId;
  const categoryId = temp.categoryId;
  const color = temp.color;
  const id = req.params.id;
  connectDB.query(
    'SELECT productName FROM `tbl_products` WHERE productName = ? and brandId = ? and categoryId = ? and color = ?',
    [productName, brandId, categoryId, color],
    (err, rows) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      if (rows.length) {
        let errorArr = [];
        errorArr.push('The product already exists !!!');
        req.flash('errors', errorArr);
        return res.redirect('/product/insert');
      }
      next();
    }
  );
};

// CHECK product name already exists UPDATE
module.exports.productNameUpdate = (req, res, next) => {
  const temp = req.body;
  const productName = temp.productName;
  const brandId = temp.brandId;
  const categoryId = temp.categoryId;
  const color = temp.color;
  const decription = temp.description;
  const price = temp.price;
  const promotion = temp.promotion;
  const country = temp.country;
  const id = req.params.id;
  connectDB.query(
    'SELECT productName FROM `tbl_products` WHERE productName = ? and brandId = ? and categoryId = ? and color = ? and description = ? and price = ? and promotion = ? and country = ?',
    [productName, brandId, categoryId, color, decription, price, promotion, country],
    (err, rows) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      if (rows.length) {
        let errorArr = [];
        errorArr.push('The product already exists !!!');
        req.flash('errors', errorArr);
        return res.redirect('/product/update/' + id);
      }
      next();
    }
  );
};
