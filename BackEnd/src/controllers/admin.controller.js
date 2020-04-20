import connectDB from '../config/connectDB';

module.exports.getAdmin = (req, res) => {
    let sql = `SELECT * FROM tbl_users; SELECT * FROM tbl_orders WHERE status= 'new'; SELECT * FROM tbl_paymentinfo; SELECT * FROM tbl_customers `;
    connectDB.query(sql, (err, result) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        }
        res.locals.countUser = result[0].length;
        res.locals.newOrder = result[1].length;
        res.locals.customer = result[3].length;
        let amount = 0;
        result[2].forEach(item => {
            amount += item.totalPayment;
        });;
        res.locals.total = amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        res.render('manage/index', {
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        })
    })
}
