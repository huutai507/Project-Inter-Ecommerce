import connectDB from '../config/connectDB';

// CHECK category name already exists INSERT
module.exports.categoryNameInsert = (req, res, next) => {
  const values = req.body;
  connectDB.query(
    'SELECT `categoryName` FROM `tbl_categories` WHERE categoryName = ?',
    [values],
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
        return res.json({ errorArr: errorArr });
      }
      next();
    }
  );
};

// CHECK category name already exists UPDATE
module.exports.categoryNameUpdate = (req, res, next) => {
  const categoryName = req.body;
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
        return res.json({ errorArr: errorArr });
      }
      next();
    }
  );
};
