import express from 'express';
import controller from '../controllers/brand.controller';
import validate from '../validation/brand.validate';

const router = express.Router();

// get all brand
router.get('/', controller.getBrand);
// create brand
router.get('/insert', controller.getCreateBrand);
router.post('/insert', validate.brand, controller.insertBrand);
// update brand
router.get('/update/:id', controller.getUpdateBrand);
router.post('/update/:id', validate.brand, controller.updateBrand);
// delete brand : id
router.get('/delete/:id', controller.deleteBrand);
// search Brands
router.get('/search', controller.searchBrand);

module.exports = router;