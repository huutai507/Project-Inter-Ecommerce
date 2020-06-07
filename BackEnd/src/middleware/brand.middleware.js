import connectDB from '../config/connectDB';

// CHECK brand name already exists INSERT
module.exports.brandNameInsert = (req, res, next) => {
  const values = req.body.values.brandName;
  connectDB.query(
    'SELECT `brandName` FROM `tbl_brands` WHERE brandName = ?',
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
        errorArr.push('The brand name already exists !!!');
        return res.json({ errorArr: errorArr });
      }
      next();
    }
  );
};

// CHECK brand name already exists UPDATE
module.exports.brandNameUpdate = (req, res, next) => {
  const brandName = req.body.values.brandName;
  connectDB.query(
    'SELECT `brandName` FROM `tbl_brands` WHERE brandName = ?',
    [brandName],
    (err, rows) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: 'Fail to query database'
        });
      }
      if (rows.length) {
        let errorArr = [];
        errorArr.push('The brand name already exists !!!');
        return res.json({ errorArr: errorArr });
      }
      next();
    }
  );
};
