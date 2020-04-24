import connectDB from '../config/connectDB';
import axios from 'axios';
module.exports.getPayment = (req, res) => {
    const page = req.query.page
    axios.get('http://localhost:4500/payment?page' + page)
        .then((response) => {
            let { returnOne, paymentAll, page, permission, name, loginsuccess } = response.data
            res.render('manage/paymentInfo/index', {
                result: returnOne,
                paymentAll,
                page,
                permission,
                name,
                loginsuccess,
                errors: req.flash('errors'),

            })
        }).catch((err) => {
            console.log(err)
        })
}
module.exports.searchPayment = (req, res) => {
    let errorArr = [];
    const page = req.query.page
    const search = req.query.key;
    axios.get('http://localhost:4500/payment/search?key=' + search + '&page=' + page)
        .then((response) => {
            let { result, search, page, paymentAll, permission, name, loginsuccess } = response.data
            if (result.length === 0) {
                errorArr.push('Not found...');
                req.flash('errors', errorArr);
                return res.redirect('/payment');
            }
            res.render('manage/paymentInfo/search', {
                result,
                search,
                page,
                paymentAll,
                permission,
                name,
                loginsuccess,
                errors: req.flash('errors'),
                success: req.flash('success')
            });
        }).catch((err) => {
            res.redirect('/payment')
        })
};