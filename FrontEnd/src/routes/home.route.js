import express from 'express';
import controller from '../controllers/home.controller';

const router = express.Router();

router.get('/', controller.getHome);
router.get('/cart', controller.getCart);
router.get('/contact', controller.getContact);
router.get('/product-details', controller.productDetail);
router.get('/filter-category/:id', controller.filterCategory);
router.get('/filter-brand/:id', controller.filterBrand);
router.get('/search', controller.search);
router.get('/filter-price', controller.filterPrice);
module.exports = router;