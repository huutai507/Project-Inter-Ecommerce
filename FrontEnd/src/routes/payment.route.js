import express from 'express';
import controller from '../controllers/payment.controller';
import middleware from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', controller.getPayment);
router.get('/search', controller.searchPayment);


module.exports = router;