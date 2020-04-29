import connectDB from '../config/connectDB';
import alert from 'alert-node';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

let FCM = require('fcm-node');
let serverKey = process.env.FCM_SERVER_KEY;

module.exports.getOrder = (req, res) => {
    let tokenClient = req.body.tokenMessage;
    stripe.charges.create({
        amount: req.body.totalCost * 100,
        source: req.body.stripeTokenId,
        currency: 'usd'
    }).then(() => {
        let dataClient = req.body;
        let totalDiscount = 0;
        for (let value of dataClient.data.cartItems) {
            totalDiscount += value.promotion * value.inCart;
        }
        let totalCost = parseFloat(dataClient.totalCost)
        const valuesCustomer = [
            dataClient.data.name,
            dataClient.data.dateOfBirth,
            dataClient.data.gender,
            dataClient.data.address,
            dataClient.data.phoneNumber,
            dataClient.data.email
        ];
        const sqlCustomer = 'INSERT INTO `tbl_customers`(`customerName`, `birthday`, `gender`, `address`, `phone`, `email`) VALUES (?)'
        connectDB.query(sqlCustomer, [valuesCustomer],
            (err, rows) => {
                const sqlEndIdCustomer = 'SELECT * FROM tbl_customers ORDER BY id DESC LIMIT 1'
                connectDB.query(sqlEndIdCustomer, (err, result) => {
                    const valuesOrder = [
                        dataClient.data.name,
                        dataClient.data.address,
                        dataClient.data.phoneNumber,
                        dataClient.data.email,
                        'New',
                        totalDiscount,
                        totalCost,
                        result[0].id
                    ];
                    const sqlInsertOrder = 'INSERT INTO `tbl_orders`(`name`, `address`, `phone`, `email`, `status`, `discount`, `total`, `customerId`) VALUES (?)'
                    connectDB.query(sqlInsertOrder, [valuesOrder], (err, result) => {
                        const sqlInsertOrder = 'INSERT INTO `tbl_orderdetail`(`promotion`, `price`, `promotionPrice`, `quantity`, `amount`, `productId`, `orderId`) VALUES (?)'
                        const sqlEndIdOrder = 'SELECT * FROM tbl_orders ORDER BY id DESC LIMIT 1'
                        connectDB.query(sqlEndIdOrder, (err, result) => {
                            for (let i = 0; i < dataClient.data.cartItems.length; i++) {
                                const valuesOrderDetail = [
                                    dataClient.data.cartItems[i].promotion,
                                    dataClient.data.cartItems[i].price,
                                    dataClient.data.cartItems[i].price - dataClient.data.cartItems[i].promotion,
                                    dataClient.data.cartItems[i].inCart,
                                    (dataClient.data.cartItems[i].price * dataClient.data.cartItems[i].inCart) - (dataClient.data.cartItems[i].promotion * dataClient.data.cartItems[i].inCart),
                                    dataClient.data.cartItems[i].id,
                                    result[0].id
                                ]
                                connectDB.query(sqlInsertOrder, [valuesOrderDetail], (err, result) => {

                                })
                            }
                            const sqlEndIdOrderAndIdCustomer = 'SELECT * FROM tbl_orders ORDER BY id DESC LIMIT 1; SELECT * FROM tbl_customers ORDER BY id DESC LIMIT 1'
                            connectDB.query(sqlEndIdOrderAndIdCustomer, (err, result) => {
                                const idOrder = result[0][0].id;
                                const idCustomer = result[1][0].id;
                                const sqlInsertOrder = 'INSERT INTO `tbl_paymentinfo`(`totalPayment`, `paymentDate`, `chargeId`, `orderId`, `customerId`) VALUES (?)'
                                let date = new Date(dataClient.token.created)
                                // console.log(dataClient.token.card.metadata)
                                let chargeId = dataClient.token.card.id
                                const valuesPayment = [
                                    totalCost,
                                    date,
                                    chargeId,
                                    idOrder,
                                    idCustomer
                                ]
                                // console.log(valuesPayment)
                                connectDB.query(sqlInsertOrder, [valuesPayment], (err, result) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        let sendingProduct = '';
                                        Object.values(dataClient.data.cartItems).map((item, index) => {
                                            sendingProduct += `
                                            <tbody bgcolor="#eee" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">
                                            <tr>
                                            <td align="left" valign="top" style="padding:3px 9px">
                                                <strong>${item.productName}</strong>
                                            </td>
                                            <td align="left" valign="top" style="padding:3px 9px"><span>${item.price}&nbsp;$</span></td>
                                            <td align="left" valign="top" style="padding:3px 9px">${item.inCart}</td>
                                            <td align="left" valign="top" style="padding:3px 9px"><span>${item.promotion}&nbsp;$</span></td>
                                            <td align="right" valign="top" style="padding:3px 9px">
                                                <span>${item.price - item.promotion}&nbsp;$</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                            `
                                        })
                                        let today = new Date();
                                        let dateAndTime = `( Ngày ${today.getDate()} Tháng ${today.getMonth() + 1} Năm ${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()})`
                                        const msg = {
                                            to: dataClient.data.email,
                                            from: `huutai050798@gmail.com`,
                                            subject: `Đơn hàng #${idOrder} đã sẵn sàng giao đến quý khách`,
                                            text: `Đơn hàng đã sẵn sàng giao đến quý khách ${dataClient.data.name}`,
                                            html: `
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#dcf0f8" style="margin:0;padding:0;background-color:#f2f2f2;width:100%!important;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">
                                            <tbody>
                                                <tr>
                                                    <td align="center" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="600" style="margin-top:15px">
                                                            <tbody> 
                                                                <tr>
                                                                    <td align="center" valign="bottom" id="m_2981247460252250039headerImage">
                                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" bgcolor="#FFFFFF" width="100%" style="padding:0">
                                                                                        <a style="border:medium none;text-decoration:none;color:#007ed3" href="http://mg-email.tiki.vn/c/eJxNj8tuwyAQRb8GdrV4GLAXLGI72bXqH0QTwDaKgQjj9veLpSwqjWZ0j66ONFY_pJgtYK8ZYYRw2lHBVasa2ozqSpi48G5g13EaKGpJ8U_f_ES86t4QqaBz7MENpbY3Qs49s4Z3M1FSzTi4fYfF3S0U0EgNiDFv60L8QhlvhURqwpteS3lVhNitzlt_Bn47Srjv6cjGIT6VDHEHU3yKsCE2uAC-XnmWgrP-CLX0HxaXT7SlJb2JgfACv8RKo_utjpStyzjr9TgKeCKI6rv643JaGpMCLnr8_vr4rPEPWNhasg"
                                                                                            target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://mg-email.tiki.vn/c/eJxNj8tuwyAQRb8GdrV4GLAXLGI72bXqH0QTwDaKgQjj9veLpSwqjWZ0j66ONFY_pJgtYK8ZYYRw2lHBVasa2ozqSpi48G5g13EaKGpJ8U_f_ES86t4QqaBz7MENpbY3Qs49s4Z3M1FSzTi4fYfF3S0U0EgNiDFv60L8QhlvhURqwpteS3lVhNitzlt_Bn47Srjv6cjGIT6VDHEHU3yKsCE2uAC-XnmWgrP-CLX0HxaXT7SlJb2JgfACv8RKo_utjpStyzjr9TgKeCKI6rv643JaGpMCLnr8_vr4rPEPWNhasg&amp;source=gmail&amp;ust=1585408700305000&amp;usg=AFQjCNEWPJMYFb0Nq5IspyxE4XuGF48vMQ">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr style="background:#fff">
                                                                    <td align="left" width="600" height="auto" style="padding:15px">
                                                                        <table>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        <h1 style="font-size:14px;font-weight:bold;color:#444;padding:0 0 5px 0;margin:0">Đơn hàng đã sẵn sàng để giao đến quý khách ${dataClient.data.name} !
                                                                                        </h1>
                                                                                        <p style="margin:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                                                        </p>
                                                                                        <h3 style="font-size:13px;font-weight:bold;color:#02acea;text-transform:uppercase;margin:20px 0 0 0;border-bottom:1px solid #ddd">Thông tin đơn hàng #${idOrder} <span style="font-size:12px;color:#777;text-transform:none;font-weight:normal">${dateAndTime}</span> </h3>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">
                                                                                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th align="left" width="50%" style="padding:6px 9px 0px 9px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;font-weight:bold">Thông tin thanh toán</th>
                                                                                                    <th align="left" width="50%" style="padding:6px 9px 0px 9px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;font-weight:bold">Địa chỉ giao hàng</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td valign="top" style="padding:3px 9px 9px 9px;border-top:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                                                                        <span style="text-transform:capitalize">${dataClient.data.name}</span><br>
                                                                                                        <a href="mailto:huutai050798@gmail.com" target="_blank">${dataClient.data.email}</a><br> ${dataClient.data.phoneNumber}
                                    
                                                                                                    </td>
                                                                                                    <td valign="top" style="padding:3px 9px 9px 9px;border-top:0;border-left:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                                                                    ${dataClient.data.name}<br> ${dataClient.data.address}, <br> Việt Nam<br> T: ${dataClient.data.phoneNumber}
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td valign="top" style="padding:7px 9px 0px 9px;border-top:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444" colspan="2">
                                                                                                        <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;font-weight:normal">
                                                                                                            <br>
                                                                                                            <strong>Phí vận chuyển: </strong>Free&nbsp;$
                                                                                                            <br>
                                                                                                            <strong>Phương thức thanh toán: </strong>Thanh toán qua thẻ tín dụng
                                                                                                            <br><strong>Xuất hóa đơn đỏ: </strong>${dataClient.data.name}<br> ------- <br> ${dataClient.data.address}
                                                                                                        </p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                    
                                                                                <tr>
                                                                                    <td>
                                                                                        <h2 style="text-align:left;margin:10px 0;border-bottom:1px solid #ddd;padding-bottom:5px;font-size:13px;color:#02acea">CHI TIẾT ĐƠN HÀNG</h2>
                                                                                        <table cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f5f5">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Sản phẩm</th>
                                                                                                    <th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px"> Đơn giá</th>
                                                                                                    <th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Số lượng</th>
                                                                                                    <th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Giảm giá</th>
                                                                                                    <th align="right" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Tổng tạm</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            ${sendingProduct}
                                                                                            <tfoot style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">
                                                                                                <tr bgcolor="#eee">
                                                                                                    <td colspan="4" align="right" style="padding:7px 9px"><strong><big>Tổng giá trị đơn hàng</big></strong></td>
                                                                                                    <td align="right" style="padding:7px 9px"><strong><big><span>${totalCost}&nbsp;$</span></big></strong></td>
                                                                                                </tr>
                                                                                            </tfoot>

                                                                                        </table>
                                    
                                                                                        <br>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <br>
                                                                                        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                                                            Quý khách có thể kiểm tra ngoại quan sản phẩm (nhãn hiệu, mẫu mã, màu sắc, số lượng, ...) trước khi thanh toán và có thể từ chối nhận hàng nếu không ưng ý. Vui lòng không kích hoạt các thiết bị điện máy-điện tử hoặc dùng thử sản phẩm.
                                                                                        </p>
                                                                                        <br>
                                                                                        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                                                            Nếu sản phẩm có dấu hiệu hư hỏng/ bể vỡ hoặc không đúng với thông tin trên website, bạn vui lòng liên hệ với chúng tôi trong vòng 48 giờ kể từ thời điểm nhận hàng để được hỗ trợ.
                                                                                        </p>
                                                                                        <br>
                                                                                        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                                                            Quý khách vui lòng giữ lại hóa đơn, hộp sản phẩm và phiếu bảo hành (nếu có) để đổi trả hàng hoặc bảo hành khi cần thiết.
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                            `
                                        }
                                        sgMail.send(msg);

                                        let fcm = new FCM(serverKey);
                                        let messageSendClient = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                            to: tokenClient,
                                            notification: {
                                                title: 'Order',
                                                body: 'A new order'
                                            }
                                        };
                                        fcm.send(messageSendClient, function (err, response) {
                                            if (err) {
                                                console.log("Something has gone wrong!", err);
                                            } else {
                                                console.log("Successfully sent with response: ", response);
                                            }
                                        });
                                    }
                                })
                            })
                        })
                    })
                })
            }

        );

    }).catch(function (err) {
        console.log(err)
    })

}
// views new order
module.exports.viewOrder = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (pages - 1) * limit;
    let sql = `SELECT * FROM tbl_orderdetail, tbl_products WHERE tbl_orderdetail.productId = tbl_products.id ; SELECT * FROM tbl_orders WHERE status ='new' LIMIT ? OFFSET ?; SELECT * FROM tbl_orders WHERE status ='new'`;
    connectDB.query(sql, [limit, offset], (err, result) => {
        let [orderDetail, order, orderAll] = result
        order.forEach(itemsOrder => {
            itemsOrder.items = [];
            orderDetail.forEach(itemsOrderDetail => {
                if (itemsOrder.id == itemsOrderDetail.orderId) {
                    itemsOrder.items.push(itemsOrderDetail);
                }
            })
        });
        res.json({
            order,
            page: pages,
            orderAll,
            loginsuccess: 0,
        })
    })
}
// confirm order
module.exports.confirmOrder = (req, res) => {
    let id = req.params.id;
    let deliver = 'Deliver';
    let updateStatus = 'UPDATE `tbl_orders` SET `status` = ? WHERE id = ?'
    connectDB.query(updateStatus, [deliver, id], (err, result) => {
        res.json({ confirmOrder: true })
    })
}
//  search new ORDER
module.exports.searchOrder = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (pages - 1) * limit;
    const search = req.query.key;
    connectDB.query(`SELECT * from  tbl_orderdetail, tbl_products WHERE tbl_orderdetail.productId = tbl_products.id ; SELECT * FROM tbl_orders WHERE (name LIKE '%${search}%' OR address LIKE '%${search}%' OR phone LIKE '%${search}%' OR email LIKE '%${search}%') AND status='new' LIMIT ? OFFSET ?; SELECT * FROM tbl_orders WHERE (name LIKE '%${search}%' OR address LIKE '%${search}%' OR phone LIKE '%${search}%' OR email LIKE '%${search}%')  AND status='new';`, [limit, offset], (err, result) => {
        let [orderDetail, order, orderAll] = result
        order.forEach(itemsOrder => {
            itemsOrder.items = [];
            orderDetail.forEach(itemsOrderDetail => {
                if (itemsOrder.id == itemsOrderDetail.orderId) {
                    itemsOrder.items.push(itemsOrderDetail);
                }
            })
        });
        if (err)
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        res.json({
            order,
            search,
            page: pages,
            orderAll,
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0
        })
    })
};
/// order confirmed
module.exports.viewOrderConfirmed = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (pages - 1) * limit;
    let sql = `SELECT * FROM tbl_orderdetail, tbl_products WHERE tbl_orderdetail.productId = tbl_products.id ; SELECT * FROM tbl_orders WHERE status ='deliver' LIMIT ? OFFSET ?; SELECT * FROM tbl_orders WHERE status ='deliver'`;
    connectDB.query(sql, [limit, offset], (err, result) => {
        let [orderDetail, order, orderAll] = result;
        order.forEach(itemsOrder => {
            itemsOrder.items = [];
            orderDetail.forEach(itemsOrderDetail => {
                if (itemsOrder.id == itemsOrderDetail.orderId) {
                    itemsOrder.items.push(itemsOrderDetail);
                }
            })
        });
        res.json({
            order,
            page: pages,
            orderAll,
            loginsuccess: 0,
            permission: req.session.permission,
            name: req.session.account
        })

    })
}
//  search  ORDER confirm 
module.exports.searchOrderConfirmed = (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (pages - 1) * limit;
    const search = req.query.key;
    connectDB.query(`SELECT * from  tbl_orderdetail, tbl_products WHERE tbl_orderdetail.productId = tbl_products.id ; SELECT * FROM tbl_orders WHERE (name LIKE '%${search}%' OR address LIKE '%${search}%' OR phone LIKE '%${search}%' OR email LIKE '%${search}%') AND status='deliver' LIMIT ? OFFSET ?; SELECT * FROM tbl_orders WHERE (name LIKE '%${search}%' OR address LIKE '%${search}%' OR phone LIKE '%${search}%' OR email LIKE '%${search}%')  AND status='deliver';`, [limit, offset], (err, result) => {
        let [orderDetail, order, orderAll] = result;
        order.forEach(itemsOrder => {
            itemsOrder.items = [];
            orderDetail.forEach(itemsOrderDetail => {
                if (itemsOrder.id == itemsOrderDetail.orderId) {
                    itemsOrder.items.push(itemsOrderDetail);
                }
            })
        });
        if (err)
            res.status(400).send({
                status: 400,
                message: 'Fail to query database'
            });
        res.json({
            order,
            search,
            page: pages,
            orderAll,
            permission: req.session.permission,
            name: req.session.account,
            loginsuccess: 0,

        })
    })
};