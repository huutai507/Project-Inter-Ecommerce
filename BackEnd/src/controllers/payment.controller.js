import connectDB from '../config/connectDB';

module.exports.getPayment = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (pages - 1) * limit;
    let sqlGetpayment = 'SELECT * FROM tbl_paymentinfo, tbl_orders WHERE tbl_paymentinfo.orderId = tbl_orders.id LIMIT ? OFFSET ?; SELECT * FROM tbl_paymentinfo, tbl_orders WHERE tbl_paymentinfo.orderId = tbl_orders.id';

    connectDB.query(sqlGetpayment, [limit, offset], (err, result) => {
        res.render('manage/paymentInfo/index', {
            result: result[0],
            paymentAll: result[1],
            page: pages,
            errors: req.flash('errors'),
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        })

    })

}
module.exports.searchPayment = (req, res) => {
    let errorArr = [];
    const pages = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (pages - 1) * limit;
    const search = req.query.key;
    const nameTable = ['tbl_paymentinfo as tp, tbl_orders as tor'];
    const name = [`tor.name LIKE '%${search}%'`];
    const phone = [`tor.phone LIKE '%${search}%'`];
    const email = [`tor.email LIKE '%${search}%'`];
    connectDB.query(`SELECT * FROM ${nameTable} WHERE (${name} OR ${phone} OR ${email}) AND tp.orderId = tor.id LIMIT ? OFFSET ?; SELECT * FROM ${nameTable} WHERE (${name} OR ${phone} OR ${email}) AND tp.orderId = tor.id`, [limit, offset], (err, result) => {
        if (err)
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        if (result[0].length === 0) {
            errorArr.push('Not found...');
            req.flash('errors', errorArr);
            return res.redirect('/payment');
        }
        res.render('manage/paymentInfo/search', {
            result: result[0],
            search: search,
            page: pages,
            paymentAll: result[1],
            errors: req.flash('errors'),
            success: req.flash('success'),
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        });
    })
};