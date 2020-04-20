import express from 'express';
import controller from '../controllers/category.controller';
import validate from '../validation/category.validate';
import middleware from '../middleware/category.middleware'

const router = express.Router();

router.get('/', controller.getCategory);
// create category
router.get('/insert', controller.getInsertCategory);
router.post('/insert', validate.category, middleware.categoryNameInsert, controller.insertCategory);
// update category
router.get('/update/:id', controller.getUpdateCategory);
router.post('/update/:id', validate.category, middleware.categoryNameUpdate, controller.updateCategory);
// delete category : id
router.get('/delete/:id', controller.deleteCategory);
// search Category
router.get('/search', controller.searchCategory);

module.exports = router;