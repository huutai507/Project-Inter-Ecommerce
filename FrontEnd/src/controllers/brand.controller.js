import { validationResult } from 'express-validator/check';
import axios from 'axios'
import { response } from 'express';

let FCM = require('fcm-node');
let serverKey = 'AAAALvxje6Q:APA91bEflP9zXkHTBit9aQUOvyay-1CmNvIuRaIJ7gwTt_uAQNcZZN8fSU0fwi7CNdfoZXSa4_THvnQo6tQuHjAOiHMcfvNkxOfc-2WjDsNRa0vP32aOx1Hx-xC6FyAL_fZ7nA8M4t5k'; //put your server key here
let fcm = new FCM(serverKey);

//get brand
module.exports.getBrand = (req, res) => {
    let pages = req.query.page;
    axios.get('http://localhost:4500/brand?page=' + pages)
        .then((response) => {
            let { brands, brandsAll, page, loginsuccess } = response.data;
            res.render('manage/brand/index', {
                brands,
                brandsAll,
                page,
                errors: req.flash('errors'),
                success: req.flash('success'),
                permission: req.session.permission,
                loginsuccess,
                name: req.session.account
            })
        }).catch((error) => {
            res.render('manage/brand/index');
        })
}

// get insert
module.exports.getCreateBrand = (req, res) => {
    axios.get('http://localhost:4500/brand/insert')
        .then((response) => {
            let { loginsuccess } = response.data
            res.render('manage/brand/createBrand', {
                errors: req.flash('errors'),
                success: req.flash('success'),
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess
            })
        }).catch((error) => {
            res.render('manage/brand/createBrand');
        })
};
// insert a Brand
module.exports.insertBrand = (req, res) => {
    const values = [req.body.brandName];
    let errorArr = [];
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect('/brand/insert');
    }
    axios.post('http://localhost:4500/brand/insert', values)
        .then((response) => {
            let { successArr, errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/brand/insert')
            }
            if (successArr) {
                req.flash('success', successArr);
                return res.redirect('/brand')
            }
        }).catch((error) => {
            res.redirect('/brand')
        })
};
// Get update
module.exports.getUpdateBrand = (req, res) => {
    let id = req.params.id;
    axios.get('http://localhost:4500/brand/update/' + id)
        .then((response) => {
            let { brand, loginsuccess } = response.data;
            res.render('manage/brand/informationBrand', {
                brand,
                errors: req.flash('errors'),
                success: req.flash('success'),
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess
            })
        }).catch((error) => {
            res.redirect('/brand')
        })
}
// update a Brand
module.exports.updateBrand = (req, res) => {
    let brandName = [req.body.brandName];
    let id = req.params.id;
    let errorArr = [];
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        const errors = Object.values(validationErros.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect('/brand/update/' + id);
    }
    axios.post('http://localhost:4500/brand/update/' + id, brandName)
        .then((response) => {
            let { successArr, errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/brand/update/' + id)
            }
            if (successArr) {
                req.flash('success', successArr);
                return res.redirect('/brand')
            }
        }).catch((error) => {
            res.redirect('/brand')
        })
};

// Delete a category
module.exports.deleteBrand = (req, res) => {
    let id = req.params.id;
    axios.get('http://localhost:4500/brand/delete/' + id)
        .then((response) => {
            let { successArr, errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/brand')
            }
            if (successArr) {
                req.flash('success', successArr);
                return res.redirect('/brand')
            }
        }).catch((error) => {
            res.redirect('/brand')
        })
};

//  search Brand
module.exports.searchBrand = (req, res) => {
    const page = req.query.page;
    const search = req.query.key;
    axios.get('http://localhost:4500/brand/search?key=' + search + '&page=' + page)
        .then((response) => {
            let { errorArr } = response.data;
            if (errorArr) {
                req.flash('errors', errorArr);
                return res.redirect('/brand')
            }
            let { brands, search, page, brandsAll, loginsuccess } = response.data;
            return res.render('manage/brand/search', {
                brands,
                search,
                page,
                brandsAll,
                permission: req.session.permission,
                name: req.session.account,
                errors: req.flash('errors'),
                loginsuccess
            })
        }).catch((error) => {
            res.redirect('/brand')
        })
};