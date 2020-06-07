require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import i18n from 'i18n';
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';
import configSS from './config/configSS';
import userRoute from './routes/user.routejs';
import productRoute from './routes/product.route';
import categoryRoute from './routes/category.route';
import brandRoute from './routes/brand.route';
import authRoute from './routes/auth.route';
import customerRoute from './routes/customer.route';
import requireAuth from './middleware/auth.middleware';
import homeRoute from './routes/home.route';
import orderRoute from './routes/order.route';
import adminRoute from './routes/admin.route';
import paymentRoute from './routes/payment.route';

//Init app
const app = express();

const port = process.env.APP_PORT || 5000;
const host = process.env.APP_HOST || 'localhost';


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(connectFlash());
app.use(express.static('src/public'));
app.use(express.json({ limit: '1mb' }));

i18n.configure({
    locales: ['en', 'vi'],
    cookie: 'lang',
    directory: __dirname + '/locales'
});

app.use(cookieParser());
app.use(i18n.init);
// session
configSS(app);
// app use  

app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/product', requireAuth.requireAuth, productRoute);
app.use('/category', requireAuth.requireAuth, categoryRoute);
app.use('/brand', requireAuth.requireAuth, brandRoute);
app.use('/auth', authRoute);
app.use('/customer', requireAuth.requireAuth, customerRoute);
app.use('/order', requireAuth.requireAuth, orderRoute);
app.use('/admin', adminRoute);
app.use('/payment', requireAuth.requireAuth, paymentRoute);


app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000 });
    res.redirect('back');
});

// app Erros
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});
// handle errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.status(404).send(err.message);
});
// listen
app.listen(port, host, () => {
    console.log(`Listening on Front End ${host} : ${port}`);
});