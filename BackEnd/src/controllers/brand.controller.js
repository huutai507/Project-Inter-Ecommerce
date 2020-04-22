import { validationResult } from 'express-validator/check';
import connectDB from '../config/connectDB';
import per from '../controllers/auth.controller'
let FCM = require('fcm-node');
let serverKey = 'AAAALvxje6Q:APA91bEflP9zXkHTBit9aQUOvyay-1CmNvIuRaIJ7gwTt_uAQNcZZN8fSU0fwi7CNdfoZXSa4_THvnQo6tQuHjAOiHMcfvNkxOfc-2WjDsNRa0vP32aOx1Hx-xC6FyAL_fZ7nA8M4t5k'; //put your server key here
let fcm = new FCM(serverKey);


//get brand
module.exports.getBrand = (req, res) => {
    // eslint-disable-next-line radix
    const pages = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (pages - 1) * limit;
    let sql = 'SELECT * FROM tbl_brands LIMIT ? OFFSET ? ; SELECT * FROM tbl_brands';
    connectDB.query(sql, [limit, offset], (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        let [brands, brandsAll] = [result[0], result[1]];
        // FIX lai cho nay
        res.json({ brands, brandsAll, page: pages, permission: 'MANAGE', loginsuccess: 0, name: 'nguyenhongthai' })
        // res.render('manage/brand/index', {
        //     brands: result[0],
        //     brandsAll: result[1],
        //     page: pages,
        //     errors: req.flash('errors'),
        //     success: req.flash('success'),
        //     permission: req.session.permission,
        //     name: req.session.account,
        //     loginsuccess: 0
        // });
    });
}

// get insert
module.exports.getCreateBrand = (req, res) => {
    res.json({ permission: 'MANAGE', name: 'nguyenhongthai', loginsuccess: 0 });
    // res.render('manage/brand/createBrand', {
    //     errors: req.flash('errors'),
    //     permission: req.session.permission,
    //     name: req.session.account,
    //     loginsuccess: 0
    // });
};
// insert a Brand
module.exports.insertBrand = (req, res) => {
    const values = req.body;
    let successArr = [];

    // query
    connectDB.query(
        'INSERT INTO `tbl_brands`(`brandName`) VALUES (?)', [values],
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
// Get update
module.exports.getUpdateBrand = (req, res) => {
    let id = req.params.id;
    let sql = 'SELECT * FROM tbl_brands WHERE id = ?';
    connectDB.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        res.json({ brand: result, permission: 'MANAGE', name: 'nguyenhongthai', loginsuccess: 0 })
        // res.render('manage/brand/informationBrand', {
        //     brand: result,
        //     errors: req.flash('errors'),
        //     permission: req.session.permission,
        //     name: req.session.account,
        //     loginsuccess: 0
        // });
    });
}
// update a Brand
module.exports.updateBrand = (req, res) => {
    const brandName = req.body;
    let id = req.params.id;
    console.log(brandName + ' control ' + id)
    let successArr = [];
    connectDB.query(
        'UPDATE `tbl_brands` SET `brandName`= ? WHERE id = ?', [brandName, id],
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
module.exports.deleteBrand = (req, res) => {
    let id = req.params.id;
    let errorArr = [];
    let successArr = [];
    connectDB.query(
        'SELECT `brandName` FROM `tbl_brands` WHERE id = ? ; DELETE FROM `tbl_brands` WHERE id = ?  ', [id, id],
        (err, result) => {
            if (err) {
                errorArr.push(
                    `Cannot be deleted because product exists with brand "${result[0][0].brandName}"`
                );
                return res.json({ errorArr: errorArr });
            }
            successArr.push(`Delete "${result[0][0].brandName}" successful`);
            res.json({ successArr: successArr });
        }
    );
};

//  search Brand
module.exports.searchBrand = (req, res) => {
    let errorArr = [];
    const pages = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (pages - 1) * limit;
    const search = req.query.key;
    const nameTable = ['tbl_brands'];
    const name = [`brandName LIKE '%${search}%'`];
    connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
        if (err)
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        if (result[0].length === 0) {
            errorArr.push('Brand not found...');
            return res.json({ errorArr: errorArr });
        }
        res.json({
            brands: result[0],
            search: search,
            page: pages,
            brandsAll: result[1],
            permission: 'MANAGE',
            name: 'nguyenhongthai',
            loginsuccess: 0
        });
    })
};