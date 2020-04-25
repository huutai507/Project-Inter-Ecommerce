import connectDB from '../config/connectDB';

module.exports.getPayment = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (pages - 1) * limit;
    let sqlGetpayment = 'SELECT * FROM tbl_paymentinfo, tbl_orders WHERE tbl_paymentinfo.orderId = tbl_orders.id LIMIT ? OFFSET ?; SELECT * FROM tbl_paymentinfo, tbl_orders WHERE tbl_paymentinfo.orderId = tbl_orders.id';

    connectDB.query(sqlGetpayment, [limit, offset], (err, result) => {
        let [returnOne, paymentAll] = result
        res.json({
            returnOne,
            paymentAll,
            page: pages,
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        })
    })
}
module.exports.searchPayment = (req, res) => {
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
        res.json({
            result: result[0],
            search: search,
            page: pages,
            paymentAll: result[1],
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        })
    })
};