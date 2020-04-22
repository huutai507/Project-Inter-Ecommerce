import { validationResult } from 'express-validator/check';
import connectDB from '../config/connectDB';
import per from '../controllers/auth.controller'
let FCM = require('fcm-node');
let serverKey = 'AAAALvxje6Q:APA91bEflP9zXkHTBit9aQUOvyay-1CmNvIuRaIJ7gwTt_uAQNcZZN8fSU0fwi7CNdfoZXSa4_THvnQo6tQuHjAOiHMcfvNkxOfc-2WjDsNRa0vP32aOx1Hx-xC6FyAL_fZ7nA8M4t5k'; //put your server key here
let fcm = new FCM(serverKey);


//get brand
module.exports.getBrand = (req, res) => {
    // eslint-disable-next-line radix
    // const pages = parseInt(req.query.page) || 1;
    // const limit = 10;
    // const offset = (pages - 1) * limit;
    // let sql = 'SELECT * FROM tbl_brands LIMIT ? OFFSET ? ; SELECT * FROM tbl_brands';
    // connectDB.query(sql, [limit, offset], (err, result) => {
    //     if (err) {
    //         res.status(400).send({
    //             status: 400,
    //             message: 'Fail to query database'
    //         });
    //     }
    //     res.render('manage/brand/index', {
    //         brands: result[0],
    //         brandsAll: result[1],
    //         page: pages,
    //         errors: req.flash('errors'),
    //         success: req.flash('success'),
    //         permission: req.session.permission,
    //         name: req.session.account,
    //         loginsuccess: 0
    //     });
    // });
}

// get insert
module.exports.getCreateBrand = (req, res) => {
    // res.render('manage/brand/createBrand', {
    //     errors: req.flash('errors'),
    //     permission: req.session.permission,
    //     name: req.session.account,
    //     loginsuccess: 0
    // });
};
// insert a Brand
module.exports.insertBrand = (req, res) => {
    // const emp = req.body;
    // const values = [emp.brandName];
    // let errorArr = [];
    // let successArr = [];
    // const validationErros = validationResult(req);
    // if (!validationErros.isEmpty()) {
    //     const errors = Object.values(validationErros.mapped());
    //     errors.forEach(item => {
    //         errorArr.push(item.msg);
    //     });
    //     req.flash('errors', errorArr);
    //     return res.redirect('/brand/insert');
    // }

    // // query
    // connectDB.query(
    //     'INSERT INTO `tbl_brands`(`brandName`) VALUES (?)', [values],
    //     (err, result) => {
    //         if (err)
    //             res.status(400).send({
    //                 status: 400,
    //                 message: 'Fail to query database'
    //             });
    //         successArr.push(`Add "${values}" successful`);
    //         req.flash('success', successArr);
    //         res.redirect('/brand');
    //     }
    // );
};
// Get update
module.exports.getUpdateBrand = (req, res) => {
    // let id = req.params.id;
    // let sql = 'SELECT * FROM tbl_brands WHERE id = ?';
    // connectDB.query(sql, [id], (err, result) => {
    //     if (err) {
    //         res.status(400).send({
    //             status: 400,
    //             message: 'Fail to query database'
    //         });
    //     }
    //     res.render('manage/brand/informationBrand', {
    //         brand: result,
    //         errors: req.flash('errors'),
    //         permission: req.session.permission,
    //         name: req.session.account,
    //         loginsuccess: 0
    //     });
    // });
}
// update a Brand
module.exports.updateBrand = (req, res) => {
    // const emp = req.body;
    // let id = req.params.id;
    // let errorArr = [];
    // let successArr = [];
    // const validationErros = validationResult(req);
    // if (!validationErros.isEmpty()) {
    //     const errors = Object.values(validationErros.mapped());
    //     errors.forEach(item => {
    //         errorArr.push(item.msg);
    //     });
    //     req.flash('errors', errorArr);
    //     return res.redirect('/brand/update/' + id);
    // }
    // // query
    // connectDB.query(
    //     'UPDATE `tbl_brands` SET `brandName`= ? WHERE id = ?', [emp.brandName, id],
    //     (err, result) => {
    //         if (err)
    //             res.status(400).send({
    //                 status: 400,
    //                 message: 'Fail to query database'
    //             });
    //         successArr.push(`Update successful`);
    //         req.flash('success', successArr);
    //         res.redirect('/brand');
    //     }
    // );
};

// Delete a category
module.exports.deleteBrand = (req, res) => {
    // let id = req.params.id;
    // let errorArr = [];
    // let successArr = [];
    // connectDB.query(
    //     'SELECT `brandName` FROM `tbl_brands` WHERE id = ? ; DELETE FROM `tbl_brands` WHERE id = ?  ', [id, id],
    //     (err, result) => {
    //         if (err) {
    //             errorArr.push(
    //                 `Cannot be deleted because product exists with brand "${result[0][0].brandName}"`
    //             );
    //             req.flash('errors', errorArr);
    //             return res.redirect('/brand');
    //         }
    //         successArr.push(`Delete "${result[0][0].brandName}" successful`);
    //         req.flash('success', successArr);
    //         res.redirect('/brand');
    //     }
    // );
};

//  search Brand
module.exports.searchBrand = (req, res) => {
    // let errorArr = [];
    // const pages = parseInt(req.query.page) || 1;
    // const limit = 10;
    // const offset = (pages - 1) * limit;
    // const search = req.query.key;
    // const nameTable = ['tbl_brands'];
    // const name = [`brandName LIKE '%${search}%'`];
    // connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
    //     if (err)
    //         res.status(400).send({
    //             status: 400,
    //             message: 'Fail to query database'
    //         });
    //     if (result[0].length === 0) {
    //         errorArr.push('Brand not found...');
    //         req.flash('errors', errorArr);
    //         return res.redirect('/brand');
    //     }
    //     res.render('manage/brand/search', {
    //         brands: result[0],
    //         search: search,
    //         page: pages,
    //         brandsAll: result[1],
    //         errors: req.flash('errors'),
    //         success: req.flash('success'),
    //         permission: req.session.permission,
    //         name: req.session.account,
    //         loginsuccess: 0
    //     });
    // })
};