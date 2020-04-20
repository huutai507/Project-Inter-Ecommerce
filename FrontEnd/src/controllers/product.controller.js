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
        res.render('manage/product/index', {
            products: result[0],
            productsAll: result[1],
            page: pages,
            errors: req.flash('errors'),
            success: req.flash('success'),
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        });
    });
};
//get insert product
module.exports.getInsertProduct = (req, res) => {
    // cloudinary.getData().then(result => result)
    // Can use promise
    let sql = 'SELECT * FROM tbl_brands; SELECT * FROM tbl_categories ';
    connectDB.query(sql, (err, result) => {
        res.render('manage/product/createProduct', {
            brandNames: result[0],
            categoryNames: result[1],
            errors: req.flash('errors'),
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        });
    });
};
// Insert a product

module.exports.insertProduct = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let upload = await cloudinary.uploadSingle(req.file.path);
    const validationErros = await validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        res.redirect('/product/insert');
        return;
    }
    const emp = req.body;
    const values = [
        emp.productName,
        emp.color,
        upload.url,
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
            successArr.push(`Add "${emp.productName}" successful`);
            req.flash('success', successArr);
            res.redirect('/product');
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
                res.render('manage/product/productInformation', {
                    item: result[2][i], // results product
                    brandNames: result[0], // results brand
                    categoryNames: result[1], // results category
                    errors: req.flash('errors'),
                    permission: req.session.permission,
                    name: req.session.account,
                    loginsuccess: 0
                });
            }
        }
    });
};

// update a product

module.exports.updateProduct = async (req, res) => {
    let upload = await cloudinary.uploadSingle(req.file.path);
    let errorArr = [];
    let successArr = [];
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        res.redirect('/product/insert');
        return;
    }

    const emp = req.body;
    connectDB.query(
        'UPDATE `tbl_products` SET `productName`=?,`color`=?,`image`=?,`description`=?,`price`=?,`promotion`=?,`country`=?,`brandId`=?,`categoryId`=? WHERE id = ?', [
        emp.productName,
        emp.color,
        upload.url,
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
            successArr.push(`Update successful`);
            req.flash('success', successArr);
            res.redirect('/product');
        }
    );

};
// delete a product
module.exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    let errorArr = [];
    let successArr = [];
    connectDB.query(
        'SELECT `productName` FROM `tbl_products` WHERE id = ? ; DELETE FROM `tbl_products` WHERE id = ?', [id, id],
        (err, result) => {
            if (err) {
                errorArr.push(`Cannot be deleted product "${result[0][0].productName}"`);
                req.flash('errors', errorArr);
                return res.redirect('/product');
            }
            successArr.push(`Delete "${result[0][0].productName}" successful`);
            req.flash('success', successArr);
            res.redirect('/product');
        }
    );
};
// search Product manager
module.exports.searchProduct = (req, res) => {
    let errorArr = [];
    const pages = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (pages - 1) * limit;
    const search = req.query.key;
    const nameTable = ['tbl_products'];
    const name = [`productName LIKE '%${search}%'`];
    connectDB.query(`SELECT * FROM ${nameTable} WHERE ${name} LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE ${name}`, [limit, offset], (err, result) => {
        if (err)
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        if (result[0].length === 0) {
            errorArr.push('Products not found...');
            req.flash('errors', errorArr);
            return res.redirect('../product');
        } else {
            res.render('manage/product/search', {
                products: result[0],
                search: search,
                page: pages,
                productsAll: result[1],
                errors: req.flash('errors'),
                success: req.flash('success'),
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess: 0
            });
        }
    });
};