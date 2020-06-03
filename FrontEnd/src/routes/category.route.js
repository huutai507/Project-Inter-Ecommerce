import express from 'express';
import controller from '../controllers/category.controller';
import validate from '../validation/category.validate';

const router = express.Router();

router.get('/', controller.getCategory);
// create category
router.get('/insert', controller.getInsertCategory);
router.post('/insert', validate.category, controller.insertCategory);
// update category
router.get('/update/:id', controller.getUpdateCategory);
router.post('/update/:id', validate.category, controller.updateCategory);
// delete category : id
router.get('/delete/:id', controller.deleteCategory);
// search Category
router.get('/search', controller.searchCategory);

module.exports = router;