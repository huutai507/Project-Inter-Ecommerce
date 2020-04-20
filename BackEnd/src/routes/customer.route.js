import express from 'express';
import controller from '../controllers/customer.controller';
import validate from '../validation/customer.validate';

const router = express.Router();



router.get('/', controller.getCustomer);
// update
router.get('/update/:id', controller.getUpdateCustomer);
router.post('/update/:id', validate.updateCustomer, controller.updateCustomer);
// delete
router.get('/delete/:id', controller.deleteCustomer);
// search
router.get('/search', controller.searchCustomer);

module.exports = router;