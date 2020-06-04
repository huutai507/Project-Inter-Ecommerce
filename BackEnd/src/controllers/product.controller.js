import { validationResult } from 'express-validator/check';
import connectDB from '../config/connectDB';
import cloudinary from '../config/cloudinaryConfig';

// get product views all products
module.exports.getProducts = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (pages - 1) * limit;
    let sql =
        'SELECT tbl_products.id, tbl_products.productName, tbl_products.color, tbl_products.image, tbl_products.description, tbl_products.price, tbl_products.promotion, tbl_products.country, tbl_brands.brandName, tbl_categories.categoryName FROM tbl_products INNER JOIN tbl_brands ON tbl_products.brandId = tbl_brands.id INNER JOIN tbl_categories ON tbl_products.categoryId = tbl_categories.id  ORDER by tbl_products.id ASC LIMIT ? OFFSET ?';
    let sql1 = 'SELECT *from tbl_products';
    connectDB.query(`${sql}; ${sql1}`, [limit, offset], (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        res.json({
            products: result[0],
            productsAll: result[1],
            page: pages,
            loginsuccess: 0
        })
    });
};
//get insert product
module.exports.getInsertProduct = (req, res) => {
    let sql = 'SELECT * FROM tbl_brands; SELECT * FROM tbl_categories ';
    connectDB.query(sql, (err, result) => {
        res.json({
            brandNames: result[0],
            categoryNames: result[1],
            loginsuccess: 0
        })
    });
};
// Insert a product

module.exports.insertProduct = async (req, res) => {
    let upload = req.body.upload.url;
    const emp = req.body.data;
    const values = [
        emp.productName,
        emp.color,
        upload,
        emp.description,
        emp.price,
        emp.promotion,
        emp.country,
        emp.brandId,
        emp.categoryId
    ];
    // query
    connectDB.query(
        'INSERT INTO `tbl_products`(`productName`, `color`, `image`, `description`, `price`, `promotion`, `country`, `brandId`, `categoryId`) VALUES (?)', [values],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.json({ insertSuccess: true })
        }
    );
}

// get update
module.exports.getUpdateProduct = (req, res) => {
    let id = req.params.id;
    let sql =
        'SELECT * FROM tbl_brands; SELECT * FROM tbl_categories; SELECT tbl_products.id, tbl_products.productName, tbl_products.color, tbl_products.image, tbl_products.description, tbl_products.price, tbl_products.promotion, tbl_products.country,tbl_products.brandId, tbl_products.categoryId, tbl_brands.brandName, tbl_categories.categoryName FROM tbl_products INNER JOIN tbl_brands ON tbl_products.brandId = tbl_brands.id INNER JOIN tbl_categories ON tbl_products.categoryId = tbl_categories.id';
    connectDB.query(sql, (err, result) => {
        for (let i = 0; i < result[2].length; i++) {
            if (result[2][i].id == id) {
                res.json({
                    item: result[2][i], // results product
                    brandNames: result[0], // results brand
                    categoryNames: result[1], // results category2
                    loginsuccess: 0
                })
            }
        }
    });
};

// update a product

module.exports.updateProduct = async (req, res) => {
    const emp = req.body.data;
    let upload
    req.body.upload === undefined ? upload = req.body.data.image : upload = req.body.upload.url
    // if (!req.body.upload.url) {
    //     upload = req.body.data.image
    // }
    // else {
    //     upload = req.body.upload.url
    // }

    // let upload = req.body.data.image || req.body.upload.url

    connectDB.query(
        'UPDATE `tbl_products` SET `productName`=?,`color`=?,`image`=?,`description`=?,`price`=?,`promotion`=?,`country`=?,`brandId`=?,`categoryId`=? WHERE id = ?', [
        emp.productName,
        emp.color,
        upload,
        emp.description,
        emp.price,
        emp.promotion,
        emp.country,
        emp.brandId,
        emp.categoryId,
        req.params.id
    ],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: 'Fail to query database'
                });
            }
            res.json({ updateSuccess: true })
            return;
        }
    );

};
// delete a product
module.exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    console.log(id)
    connectDB.query(
        'SELECT `productName` FROM `tbl_products` WHERE id = ? ; DELETE FROM `tbl_products` WHERE id = ?', [id, id],
        (err, result) => {

            if (err) {
                console.log(err)
                res.json({ deleteError: true, nameProduct: result[0][0].productName })
                return;
            }
            res.json({ deleteProduct: true, nameProduct: result[0][0].productName })
            return;
        }
    );
};
// search Product manager
module.exports.searchProduct = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (pages - 1) * limit;
    const search = req.query.key;
    const nameTable = ['tbl_products'];
    const name = [`productName LIKE '%${search}%' OR color LIKE '%${search}%' OR description LIKE '%${search}%' OR price LIKE '%${search}%'`];
    connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
        if (err)
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });

        res.json({
            products: result[0],
            search: search,
            page: pages,
            productsAll: result[1],
            errors: req.flash('errors'),
            success: req.flash('success'),
            loginsuccess: 0
        })
    });
};