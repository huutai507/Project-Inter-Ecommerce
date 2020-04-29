import axios from 'axios';
import cloudinary from '../config/cloudinaryConfig';
import { validationResult } from 'express-validator/check';
import { response } from 'express';

// get product views all products
module.exports.getProducts = (req, res) => {
    const page = req.query.page
    axios.get('http://localhost:4500/product?page=' + page)
        .then((response) => {
            let { products, productsAll, page, loginsuccess } = response.data
            res.render('manage/product/index', {
                products,
                productsAll,
                page,
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess,
                errors: req.flash('errors'),
                success: req.flash('success')
            })
        })
};
//get insert product
module.exports.getInsertProduct = (req, res) => {
    axios.get('http://localhost:4500/product/insert')
        .then((response) => {
            let { brandNames, categoryNames, loginsuccess } = response.data
            res.render('manage/product/createProduct', {
                brandNames,
                categoryNames,
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess,
                errors: req.flash('errors'),
            })

        })
};
// Insert a product

module.exports.insertProduct = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let data = req.body
    const validationErros = await validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect('/product/insert');
    }
    let upload = await cloudinary.uploadSingle(req.file.path);
    axios.post('http://localhost:4500/product/insert', { data, upload })
        .then((response) => {
            let { insertSuccess, productExist } = response.data
            if (insertSuccess) {
                successArr.push(`Add "${data.productName}" successful`);
                req.flash('success', successArr);
                res.redirect('/product');
            }
            if (productExist) {
                errorArr.push('The product already exists !!!');
                req.flash('errors', errorArr);
                return res.redirect('/product/insert');
            }
        }).catch((err) => {
            res.redirect('/product');
        })

}

// get update
module.exports.getUpdateProduct = (req, res) => {
    let id = req.params.id;
    axios.get('http://localhost:4500/product/update/' + id)
        .then((response) => {
            let { item, brandNames, categoryNames, permission, name, loginsuccess } = response.data
            res.render('manage/product/productInformation', {
                item,
                brandNames,
                categoryNames,
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess,
                errors: req.flash('errors')
            });
        }).catch(() => {
            res.redirect('/product')
        })
};

// update a product

module.exports.updateProduct = async (req, res) => {
    let id = req.params.id;
    let errorArr = [];
    let successArr = [];
    let data = req.body
    const validationErros = await validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect('/product/insert');
    }
    let upload = await cloudinary.uploadSingle(req.file.path);
    axios.post('http://localhost:4500/product/update/' + id, { data, upload })
        .then((response) => {
            let { updateSuccess, productExist } = response.data
            if (updateSuccess) {
                successArr.push(`Add "${data.productName}" successful`);
                req.flash('success', successArr);
                return res.redirect('/product');
            }
            if (productExist) {
                errorArr.push('The product already exists !!!');
                req.flash('errors', errorArr);
                return res.redirect('/product/update/' + id);

            }
        }).catch((err) => {
            res.redirect('/product/update/' + id);
        })
};
// delete a product
module.exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    let errorArr = [];
    let successArr = [];
    axios.get('http://localhost:4500/product/delete/' + id)
        .then((response) => {
            let { deleteProduct, deleteError, nameProduct } = response.data
            if (deleteError) {
                errorArr.push(`Cannot be deleted product "${nameProduct}"`);
                req.flash('errors', errorArr);
                return res.redirect('/product');
            }
            if (deleteProduct) {
                successArr.push(`Delete "${nameProduct}" successful`);
                req.flash('success', successArr);
                res.redirect('/product')
            }
        })
};
// search Product manager
module.exports.searchProduct = (req, res) => {
    let errorArr = [];
    const page = req.query.page;
    const search = req.query.key;
    axios.get('http://localhost:4500/product/search?key=' + search + '&page=' + page)
        .then((response) => {
            let { products, search, page, productsAll, permission, name, loginsuccess } = response.data
            if (products.length === 0) {
                errorArr.push('Products not found...');
                req.flash('errors', errorArr);
                return res.redirect('../product');
            }
            res.render('manage/product/search', {
                products,
                search,
                page,
                productsAll,
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess,
                errors: req.flash('errors'),
                success: req.flash('success')
            })

        }).catch((err) => {
            console.log(err)
        })

};