import axios from 'axios';
const API_URL = process.env.API_URL || 'http://localhost:4500'
module.exports.getAdmin = (req, res) => {
    axios.get(`${API_URL}/admin`)
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
