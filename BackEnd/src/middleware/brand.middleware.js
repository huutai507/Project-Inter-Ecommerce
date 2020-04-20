import connectDB from '../config/connectDB';

// CHECK brand name already exists INSERT
module.exports.brandNameInsert = (req, res, next) => {
  const brandName = req.body.brandName;
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
        req.flash('errors', errorArr);
        return res.redirect('/brand/insert');
      }
      next();
    }
  );
};

// CHECK brand name already exists UPDATE
module.exports.brandNameUpdate = (req, res, next) => {
  const brandName = req.body.brandName;
  const id = req.params.id;
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
        req.flash('errors', errorArr);
        return res.redirect('/brand/update/' + id);
      }
      next();
    }
  );
};
