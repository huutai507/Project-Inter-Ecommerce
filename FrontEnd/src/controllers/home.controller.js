import connectDB from '../config/connectDB';
let axios = require('axios');
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

module.exports.getHome = (req, res) => {
    axios.get('http://localhost:5566/')
    .then((response) => {
        let {products, categories, brands, errors, jsonData} = response.data
        res.render('index',{
            products,
            categories,
            brands,
            errors,
            jsonData
        })
    }).catch((error) => {
        alert('Error Database', error)
    })
}
// cart
module.exports.getCart = (req, res) => {
    axios.get('http://localhost:5566/')
    .then((response) => {
        let {stripePublicKey, categories, brands } = response.data
        res.render('cart',{
            stripePublicKey,
            categories,
            brands
        })
    })
}

module.exports.getContact = (req, res) => {
    let sql = 'SELECT * FROM tbl_products; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, (err, result) => {
        let categories = result[1];
        let brands = result[2];
        res.render('contact', {
            categories: categories,
            brands: brands
        });
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
        let categories = result[1];
        let brands = result[2];
        res.render('productDetail', {
            categories: categories,
            brands: brands
        });
    })
}
// filter category
module.exports.filterCategory = (req, res) => {
    let categoryId = req.params.id;
    let sql = 'SELECT * FROM tbl_products where categoryId = ? ORDER BY price DESC;  SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, [categoryId], (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        let dataProductJSON = JSON.stringify(result[0]);
        if (result[0].length) {
            res.render('main/filter/filter', {
                products: result[0],
                categories: result[1],
                brands: result[2],
                jsonData: dataProductJSON,
                errors: ''
            });
        } else
            res.render('main/filter/filter', {
                products: result[0],
                categories: result[1],
                brands: result[2],
                jsonData: dataProductJSON,
                errors: 'No products'
            })
    })
}
// filter Brand
module.exports.filterBrand = (req, res) => {
    let brandId = req.params.id;
    let sql = 'SELECT * FROM tbl_products where brandId = ? ORDER BY price DESC; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands ';
    connectDB.query(sql, [brandId], (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        let dataProductJSON = JSON.stringify(result[0]);
        if (result[0].length) {
            res.render('main/filter/filter', {
                products: result[0],
                categories: result[1],
                brands: result[2],
                jsonData: dataProductJSON,
                errors: ''
            });
        } else
            res.render('main/filter/filter', {
                products: result[0],
                categories: result[1],
                brands: result[2],
                jsonData: dataProductJSON,
                errors: 'No products'
            })
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
            if (err)
                res.status(400).send({
                    status: 400,
                    message: 'Fail to query database'
                });
            let dataProductJSON = JSON.stringify(result[0]);
            if (result[0].length) {
                res.render('main/filter/filter', {
                    products: result[0],
                    categories: result[1],
                    brands: result[2],
                    jsonData: dataProductJSON,
                    errors: ''
                });
            } else {
                res.render('error', {
                    products: result[0],
                    categories: result[1],
                    brands: result[2],
                    jsonData: dataProductJSON,
                })
            }
        }
    );
};
// filter price
module.exports.filterPrice = (req, res) => {
    const filter = req.query.from;
    const filter1 = req.query.to;
    connectDB.query(
        'SELECT * FROM `tbl_products` WHERE price BETWEEN ? and ? ORDER BY price DESC; SELECT * FROM tbl_categories; SELECT * FROM tbl_brands`', [filter, filter1],
        (err, result) => {
            if (err)
                res.status(400).send({
                    status: 400,
                    message: 'Fail to query database'
                });
            let dataProductJSON = JSON.stringify(result[0]);
            if (result[0].length) {
                res.render('main/filter/filter', {
                    products: result[0],
                    categories: result[1],
                    brands: result[2],
                    jsonData: dataProductJSON,
                    errors: ''
                });
            } else {
                res.render('error', {
                    products: result[0],
                    categories: result[1],
                    brands: result[2],
                    jsonData: dataProductJSON,
                })
            }
        }
    );
};