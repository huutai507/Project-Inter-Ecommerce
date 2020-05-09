import axios from 'axios';
const API_URL = process.env.API_URL || 'localhost:4500'
module.exports.getPayment = (req, res) => {
    const page = req.query.page
    axios.get(`${API_URL}/payment?page=${page}`)
        .then((response) => {
            let { returnOne, paymentAll, page, loginsuccess } = response.data
            res.render('manage/paymentInfo/index', {
                result: returnOne,
                paymentAll,
                page,
                permission: req.session.permission,
                name: req.session.account,
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
    axios.get(`${API_URL}/payment/search?key=${search}&page=${page}`)
        .then((response) => {
            let { result, search, page, paymentAll, loginsuccess } = response.data
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
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess,
                errors: req.flash('errors'),
                success: req.flash('success')
            });
        }).catch((err) => {
            res.redirect('/payment')
        })
};