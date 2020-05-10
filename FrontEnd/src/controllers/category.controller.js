import { validationResult } from 'express-validator/check';
import axios from 'axios'
const API_URL = process.env.API_URL || 'http://localhost:4500'
// get category // views an Category
module.exports.getCategory = (req, res) => {
    let pages = req.query.page;
    axios.get(`${API_URL}/category?page=${pages}`)
        .then((response) => {
            let { category, categoryAll, page, loginsuccess } = response.data;
            res.render('manage/category/index', {
                category,
                categoryAll,
                page,
                errors: req.flash('errors'),
                success: req.flash('success'),
                permission: req.session.permission,
                loginsuccess,
                name: req.session.account
            })
        }).catch((error) => {
            res.redirect('/category');
        })
};

// get insert
module.exports.getInsertCategory = (req, res) => {
    axios.get(`${API_URL}/category/insert`)
        .then((response) => {
            let { loginsuccess } = response.data
            res.render('manage/category/createCategory', {
                errors: req.flash('errors'),
                success: req.flash('success'),
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess
            })
        }).catch((error) => {
            res.redirect('/category');
        })
};
// insert a Category
module.exports.insertCategory = (req, res) => {
    const values = [req.body.categoryName];
    let errorArr = [];
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect('/category/insert');
    }
    axios.post(`${API_URL}/category/insert`, values)
        .then((response) => {
            let { successArr, errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/category/insert')
            }
            if (successArr) {
                req.flash('success', successArr);
                return res.redirect('/category')
            }
        }).catch((error) => {
            res.redirect('/category')
        })
};
// get update
module.exports.getUpdateCategory = (req, res) => {
    let id = req.params.id;
    axios.get(`${API_URL}/category/update/${id}`)
        .then((response) => {
            let { category, loginsuccess } = response.data;
            res.render('manage/category/informationCategory', {
                category,
                errors: req.flash('errors'),
                success: req.flash('success'),
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess
            })
        }).catch((error) => {
            res.redirect('/category')
        })
};
// update Category
module.exports.updateCategory = (req, res) => {
    let categoryName = [req.body.categoryName];
    let id = req.params.id;
    let errorArr = [];
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect('/category/update/' + id);
    }
    axios.post(`${API_URL}/category/update/${id}`, categoryName)
        .then((response) => {
            let { successArr, errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/category/update/' + id)
            }
            if (successArr) {
                req.flash('success', successArr);
                return res.redirect('/category')
            }
        }).catch((error) => {
            res.redirect('/category')
        })
};

// Delete a category
module.exports.deleteCategory = (req, res) => {
    let id = req.params.id;
    axios.get(`${API_URL}/category/delete/${id}`)
        .then((response) => {
            let { successArr, errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/category')
            }
            if (successArr) {
                req.flash('success', successArr);
                return res.redirect('/category')
            }
        }).catch((error) => {
            res.redirect('/category')
        })
};
//  search Category
module.exports.searchCategory = (req, res) => {
    const page = req.query.page;
    const search = req.query.key;
    axios.get(`${API_URL}/category/search?key=${search}&page=${page}`)
        .then((response) => {
            let { errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/category')
            }
            let { category, search, page, categoryAll, loginsuccess } = response.data;
            return res.render('manage/category/search', {
                category,
                search,
                page,
                categoryAll,
                permission: req.session.permission,
                name: req.session.account,
                errors: req.flash('errors'),
                loginsuccess
            })
        }).catch((error) => {
            res.redirect('/category')
        })
};