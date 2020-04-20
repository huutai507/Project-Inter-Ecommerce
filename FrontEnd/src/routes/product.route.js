import express from 'express';
import controller from '../controllers/product.controller';
import validate from '../validation/product.validate';
import middleware from '../middleware/product.middleware'
import upload from '../config/multer';


const router = express.Router();
// get views all products
router.get('/', controller.getProducts);
// insert a product
router.get('/insert', controller.getInsertProduct);
router.post('/insert', upload.single('image'), validate.product, middleware.productNameInsert, controller.insertProduct);
// update a product

router.get('/update/:id', controller.getUpdateProduct);
router.post('/update/:id', upload.single('image'), validate.product, middleware.productNameUpdate, controller.updateProduct);
// delete a product

router.get('/delete/:id', controller.deleteProduct);
// search product
router.get('/search', controller.searchProduct);




module.exports = router;