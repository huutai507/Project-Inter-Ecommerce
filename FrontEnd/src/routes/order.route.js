import express from 'express';
import controller from '../controllers/order.controller';

const router = express.Router();
router.get('/', controller.viewOrder);
router.get('/order-confirmed', controller.viewOrderConfirmed);
router.post('/', controller.getOrder);
router.get('/search', controller.searchOrder);
router.get('/search-orderconfirm', controller.searchOrderConfirmed);
router.get('/confirm/:id', controller.confirmOrder);


module.exports = router;