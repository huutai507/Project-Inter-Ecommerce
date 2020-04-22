import { validationResult } from 'express-validator/check';
import connectDB from '../config/connectDB';

// get category // views an Category
module.exports.getCategory = (req, res) => {
    // const pages = parseInt(req.query.page) || 1;
    // const limit = 10;
    // const offset = (pages - 1) * limit;
    // let sql = 'SELECT * FROM tbl_categories LIMIT ? OFFSET ? ; SELECT * FROM tbl_categories';
    // connectDB.query(sql, [limit, offset], (err, result) => {
    //     if (err) {
    //         res.status(400).send({
    //             status: 400,
    //             message: 'Fail to query database'
    //         });
    //     }
    //     res.render('manage/category/index', {
    //         category: result[0],
    //         categoryAll: result[1],
    //         page: pages,
    //         errors: req.flash('errors'),
    //         success: req.flash('success'),
    //         permission: req.session.permission,
    //         name: req.session.account,
    //         loginsuccess: 0
    //     });
    // });
};

// get insert
module.exports.getInsertCategory = (req, res) => {
    // res.render('manage/category/createCategory', {
    //     errors: req.flash('errors'),
    //     permission: req.session.permission,
    //     name: req.session.account,
    //     loginsuccess: 0
    // });
};
// insert a Category
module.exports.insertCategory = (req, res) => {
    // const emp = req.body;
    // const values = [emp.categoryName];
    // let errorArr = [];
    // let successArr = [];
    // const validationErros = validationResult(req);
    // if (!validationErros.isEmpty()) {
    //     const errors = Object.values(validationErros.mapped());
    //     errors.forEach(item => {
    //         errorArr.push(item.msg);
    //     });
    //     req.flash('errors', errorArr);
    //     return res.redirect('/category/insert');
    // }
    // // query
    // connectDB.query(
    //     'INSERT INTO `tbl_categories`(`categoryName`) VALUES (?)', [values],
    //     (err, result) => {
    //         if (err)
    //             res.status(400).send({
    //                 status: 400,
    //                 message: 'Fail to query database'
    //             });
    //         successArr.push(`Add "${values}" successful`);
    //         req.flash('success', successArr);
    //         res.redirect('/category');
    //     }
    // );
};
// get update
module.exports.getUpdateCategory = (req, res) => {
    // let id = req.params.id;
    // let sql = 'SELECT * FROM tbl_categories WHERE id = ?';
    // connectDB.query(sql, [id], (err, result) => {
    //     if (err) {
    //         res.status(400).send({
    //             status: 400,
    //             message: 'Fail to query database'
    //         });
    //     } else {
    //         res.render('manage/category/informationCategory', {
    //             category: result,
    //             errors: req.flash('errors'),
    //             permission: req.session.permission,
    //             name: req.session.account,
    //             loginsuccess: 0
    //         });
    //     }
    // });
};
// update Category
module.exports.updateCategory = (req, res) => {
    // const emp = req.body;
    // let id = req.params.id;
    // const errorArr = [];
    // let successArr = [];
    // const validationErros = validationResult(req);
    // if (!validationErros.isEmpty()) {
    //     const errors = Object.values(validationErros.mapped());
    //     errors.forEach(item => {
    //         errorArr.push(item.msg);
    //     });
    //     req.flash('errors', errorArr);
    //     return res.redirect('/category/update/' + id);
    // }
    // // query
    // connectDB.query(
    //     'UPDATE `tbl_categories` SET `categoryName`=? WHERE id = ?', [emp.categoryName, id],
    //     (err, result) => {
    //         if (err)
    //             res.status(400).send({
    //                 status: 400,
    //                 message: 'Fail to query database'
    //             });
    //         successArr.push(`Update successful`);
    //         req.flash('success', successArr);
    //         res.redirect('/category');
    //     }
    // );
};

// Delete a category
module.exports.deleteCategory = (req, res) => {
    // let id = req.params.id;
    // let errorArr = [];
    // let successArr = [];
    // connectDB.query(
    //     'SELECT  `categoryName` FROM `tbl_categories` WHERE id = ? ; DELETE FROM `tbl_categories` WHERE id = ?', [id, id],
    //     (err, result) => {
    //         if (err) {
    //             errorArr.push(
    //                 `Cannot be deleted because product exists with categories "${result[0][0].categoryName}"`
    //             );
    //             req.flash('errors', errorArr);
    //             return res.redirect('/category');
    //         }
    //         successArr.push(`Delete "${result[0][0].categoryName}" successful`);
    //         req.flash('success', successArr);
    //         res.redirect('/category');
    //     }
    // );
};
//  search Category
module.exports.searchCategory = (req, res) => {
    // let errorArr = [];
    // const pages = parseInt(req.query.page) || 1;
    // const limit = 10;
    // const offset = (pages - 1) * limit;
    // const search = req.query.key;
    // const nameTable = ['tbl_categories'];
    // const name = [`categoryName LIKE '%${search}%'`];
    // connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
    //     if (err)
    //         res.status(400).send({
    //             status: 400,
    //             message: 'Fail to query database'
    //         });
    //     if (result[0].length === 0) {
    //         errorArr.push('Category not found...');
    //         req.flash('errors', errorArr);
    //         return res.redirect('../category');
    //     } else
    //         res.render('manage/category/search', {
    //             category: result[0],
    //             search: search,
    //             page: pages,
    //             categoryAll: result[1],
    //             errors: req.flash('errors'),
    //             success: req.flash('success'),
    //             permission: req.session.permission,
    //             name: req.session.account,
    //             loginsuccess: 0
    //         });
    // });
};