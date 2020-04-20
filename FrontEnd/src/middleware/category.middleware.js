import connectDB from '../config/connectDB';

// CHECK category name already exists INSERT
module.exports.categoryNameInsert = (req, res, next) => {
  const categoryName = req.body.categoryName;
  connectDB.query(
    'SELECT `categoryName` FROM `tbl_categories` WHERE categoryName = ?',
    [categoryName],
    (err, rows) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      if (rows.length) {
        let errorArr = [];
        errorArr.push('The category name already exists !!!');
        req.flash('errors', errorArr);
        return res.redirect('/category/insert');
      }
      next();
    }
  );
};

// CHECK category name already exists UPDATE
module.exports.categoryNameUpdate = (req, res, next) => {
  const categoryName = req.body.categoryName;
  const id = req.params.id;
  connectDB.query(
    'SELECT `categoryName` FROM `tbl_categories` WHERE categoryName = ?',
    [categoryName],
    (err, rows) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      if (rows.length) {
        let errorArr = [];
        errorArr.push('The category name already exists !!!');
        req.flash('errors', errorArr);
        return res.redirect('/category/update/' + id);
      }
      next();
    }
  );
};
