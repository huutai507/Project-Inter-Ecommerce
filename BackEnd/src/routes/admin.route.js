import express from 'express';
import controller from '../controllers/admin.controller';
import middleware from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', controller.getAdmin);


module.exports = router;