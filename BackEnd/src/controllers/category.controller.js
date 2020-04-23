import { validationResult } from 'express-validator/check';
import connectDB from '../config/connectDB';

// get category // views an Category
module.exports.getCategory = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (pages - 1) * limit;
    let sql = 'SELECT * FROM tbl_categories LIMIT ? OFFSET ? ; SELECT * FROM tbl_categories';
    connectDB.query(sql, [limit, offset], (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        let [category, categoryAll] = [result[0], result[1]];
        res.json({ category, categoryAll, page: pages, loginsuccess: 0 })
    });
};

// get insert
module.exports.getInsertCategory = (req, res) => {
    res.json({ loginsuccess: 0 });
};
// insert a Category
module.exports.insertCategory = (req, res) => {
    const values = req.body;
    let successArr = [];
    // query
    connectDB.query(
        'INSERT INTO `tbl_categories`(`categoryName`) VALUES (?)', [values],
        (err, result) => {
            if (err)
                res.status(400).send({
                    status: 400,
                    message: 'Fail to query database'
                });
            successArr.push(`Add "${values}" successful`);
            res.json({ successArr: successArr });
        }
    );
};
// get update
module.exports.getUpdateCategory = (req, res) => {
    let id = req.params.id;
    let sql = 'SELECT * FROM tbl_categories WHERE id = ?';
    connectDB.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        res.json({ category: result, loginsuccess: 0 })
    });
};
// update Category
module.exports.updateCategory = (req, res) => {
    const categoryName = req.body;
    let id = req.params.id;
    let successArr = [];
    connectDB.query(
        'UPDATE `tbl_categories` SET `categoryName`=? WHERE id = ?', [categoryName, id],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: 'Fail to query database'
                });
            }
            successArr.push(`Update successful`);
            res.json({ successArr: successArr });
        }
    );
};

// Delete a category
module.exports.deleteCategory = (req, res) => {
    let id = req.params.id;
    let errorArr = [];
    let successArr = [];
    connectDB.query(
        'SELECT  `categoryName` FROM `tbl_categories` WHERE id = ? ; DELETE FROM `tbl_categories` WHERE id = ?', [id, id],
        (err, result) => {
            if (err) {
                errorArr.push(
                    `Cannot be deleted because product exists with categories "${result[0][0].categoryName}"`
                );
                return res.json({ errorArr: errorArr });
            }
            successArr.push(`Delete "${result[0][0].categoryName}" successful`);
            res.json({ successArr: successArr });
        }
    );
};
//  search Category
module.exports.searchCategory = (req, res) => {
    let errorArr = [];
    const pages = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (pages - 1) * limit;
    const search = req.query.key;
    const nameTable = ['tbl_categories'];
    const name = [`categoryName LIKE '%${search}%'`];
    connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
        if (err)
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        if (result[0].length === 0) {
            errorArr.push('Category not found...');
            return res.json({ errorArr: errorArr });
        }
        res.json({
            category: result[0],
            search: search,
            page: pages,
            categoryAll: result[1],
            loginsuccess: 0
        });
    })
};