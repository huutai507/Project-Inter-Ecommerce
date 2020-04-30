import connectDB from '../config/connectDB';
import { TokenExpiredError } from 'jsonwebtoken';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)

module.exports.getHome = (req, res) => {
    let sql = 'SELECT * FROM tbl_products; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, (err, result) => {
        let dataProductJSON = JSON.stringify(result[0]);
        let [products, categories, brands] = result;
        res.json({ products, categories, brands, errors: '', jsonData: dataProductJSON })
    })
}
// cart
module.exports.getCart = (req, res) => {
    let sql = 'SELECT * FROM tbl_products; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, (err, result) => {
        let [categories, brands] = result;
        res.json({ stripePublicKey, categories, brands })

    })

}

module.exports.getContact = (req, res) => {
    let sql = 'SELECT * FROM tbl_products; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, (err, result) => {
        let [categories, brands] = [result[1], result[2]];
        res.json({ categories, brands });
    })
}

module.exports.getShop = (req, res) => {
    let sql = 'SELECT * FROM tbl_products; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, (err, result) => {
        let categories = result[1];
        let brands = result[2];
        res.render('shop', {
            categories: categories,
            brands: brands
        });
    })
}
//  product detail
module.exports.productDetail = (req, res) => {
    let sql = 'SELECT * FROM tbl_products; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, (err, result) => {
        let [categories, brands] = [result[1], result[2]];
        res.json({ categories, brands });
    })
}
// filter category
module.exports.filterCategory = (req, res) => {
    let categoryId = req.params.id;
    let sql = 'SELECT * FROM tbl_products where categoryId = ? ORDER BY price DESC;  SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, [categoryId], (err, result) => {
        let [products, categories, brands] = result;
        let dataProductJSON = JSON.stringify(result[0]);
        if (result[0].length) {
            res.json({
                products,
                categories,
                brands,
                errors: '',
                jsonData: dataProductJSON
            })
            return;
        } else {
            res.json({
                products,
                categories,
                brands,
                errors: 'No products',
                jsonData: dataProductJSON
            })
            return;
        }

    })
}
// filter Brand
module.exports.filterBrand = (req, res) => {
    let brandId = req.params.id;
    let sql = 'SELECT * FROM tbl_products where brandId = ? ORDER BY price DESC; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, [brandId], (err, result) => {
        let dataProductJSON = JSON.stringify(result[0]);
        let [products, categories, brands] = result;
        if (result[0].length) {
            res.json({
                products,
                categories,
                brands,
                errors: '',
                jsonData: dataProductJSON
            })
            return;
        } else {
            res.json({
                products,
                categories,
                brands,
                errors: 'No products',
                jsonData: dataProductJSON
            })
            return;
        }
    })
}

// search
module.exports.search = (req, res) => {
    const search = req.query.key;
    const nameTable = ['tbl_products'];
    const name = [`tbl_products.productName LIKE '%${search}%' ORDER BY price DESC; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands`];
    connectDB.query(
        `SELECT DISTINCT * FROM ${nameTable} WHERE ${name}`,
        (err, result) => {
            let dataProductJSON = JSON.stringify(result[0]);
            let [products, categories, brands] = result;
            if (result[0].length) {
                res.json({
                    products,
                    categories,
                    brands,
                    errors: '',
                    jsonData: dataProductJSON
                })
                return;
            } else {
                res.json({
                    products,
                    categories,
                    brands,
                    errors: 'No products',
                    jsonData: dataProductJSON
                })
                return;
            }
        }
    );
};
// filter price
module.exports.filterPrice = (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    connectDB.query(
        'SELECT * FROM `tbl_products` WHERE price BETWEEN ? and ? ORDER BY price DESC; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands`', [from, to],
        (err, result) => {
            let dataProductJSON = JSON.stringify(result[0]);
            let [products, categories, brands] = result;
            if (result[0].length) {
                res.json({
                    products,
                    categories,
                    brands,
                    errors: '',
                    jsonData: dataProductJSON
                })
                return;
            } else {
                res.json({
                    products,
                    categories,
                    brands,
                    errors: 'No products',
                    jsonData: dataProductJSON
                })
                return;
            }
        }
    );
};