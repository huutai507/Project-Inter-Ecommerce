import alert from 'alert-node';
import axios from 'axios';
module.exports.getOrder = (req, res) => {

}
// views new order
module.exports.viewOrder = (req, res) => {
    let page = req.query.page
    axios.get('http://localhost:4500/order?page=' + page)
        .then((response) => {
            let { order, page, orderAll, loginsuccess, permission, name } = response.data
            res.render('manage/order/index', {
                order,
                page,
                orderAll,
                loginsuccess,
                permission,
                name,
                errors: req.flash('errors'),
                success: req.flash('success')
            })
        })
}
// confirm order
module.exports.confirmOrder = (req, res) => {
    let id = req.params.id;
    console.log(id)
    let successArr = [];
    axios.get('http://localhost:4500/order/confirm/' + id)
        .then((response) => {
            let { confirmOrder } = response.data
            if (confirmOrder) {
                successArr.push('Confirm successful');
                req.flash('success', successArr);
                res.redirect('/order')
            }
        })
        .catch((err) => {
            req.flash('error', 'Confirm fail');
            res.redirect('/order')
        })

}
//  search new ORDER
module.exports.searchOrder = (req, res) => {
    let errorArr = [];
    const search = req.query.key;
    const page = req.query.page;
    axios.get('http://localhost:4500/order/search?key=' + search + '&page=' + page)
        .then((response) => {
            let { order, search, page, orderAll, permission, name, loginsuccess } = response.data
            if (order.length === 0) {
                errorArr.push('No order found...');
                req.flash('errors', errorArr);
                return res.redirect('/order');
            }
            res.render('manage/order/search', {
                order,
                search,
                page,
                orderAll,
                permission,
                name,
                loginsuccess,
                errors: req.flash('errors'),
                success: req.flash('success')
            })
        }).catch((err) => {
            console.log(err)
            res.redirect('/order')
        })
};
/// order confirmed
module.exports.viewOrderConfirmed = (req, res) => {
    const page = req.query.page;
    axios.get('http://localhost:4500/order/order-confirmed?page=' + page)
        .then((response) => {
            let { order, page, orderAll, loginsuccess, permission, name } = response.data
            res.render('manage/order/orderConfirmed', {
                order,
                page,
                orderAll,
                loginsuccess,
                permission,
                name,
                errors: req.flash('errors'),
                success: req.flash('success')
            })
        }).catch(() => {
            res.redirect('/order/order-comfirm')
        })
}
//  search  ORDER confirm 
module.exports.searchOrderConfirmed = (req, res) => {
    let errorArr = [];
    const page = req.query.page;
    const search = req.query.key;
    axios.get('http://localhost:4500/order/search-orderconfirm?key=' + search + '&page=' + page)
        .then((response) => {
            let { order, search, page, orderAll, permission, name, loginsuccess } = response.data;
            if (order.length === 0) {
                errorArr.push('No order found...');
                req.flash('errors', errorArr);
                return res.redirect('/order');
            }
            res.render('manage/order/searchOrderConfirm', {
                order,
                search,
                page,
                orderAll,
                permission,
                name,
                loginsuccess,
                errors: req.flash('errors'),
                success: req.flash('success')
            })
        }).catch((err) => {
            res.redirect('/order')
        })
};