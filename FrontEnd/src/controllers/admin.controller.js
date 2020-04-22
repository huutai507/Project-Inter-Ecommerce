import axios from 'axios';
module.exports.getAdmin = (req, res) => {
    axios.get('http://localhost:4500/admin')
        .then((response) => {
            let { permission,
                name,
                loginsuccess,
                countUser,
                newOrder,
                customer,
                total } = response.data
            res.render('manage/index', {
                permission,
                name,
                loginsuccess,
                countUser,
                newOrder,
                customer,
                total
            })
        })

}
