import axios from 'axios';
module.exports.getAdmin = (req, res) => {
    axios.get('http://localhost:4500/admin')
        .then((response) => {
            let {
                loginsuccess,
                countUser,
                newOrder,
                customer,
                total } = response.data
            res.render('manage/index', {
                permission: req.session.permission,
                name: req.session.account,
                loginsuccess,
                countUser,
                newOrder,
                customer,
                total
            })
        })

}
