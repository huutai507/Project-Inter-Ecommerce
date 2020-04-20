import express from 'express';
import controller from '../controllers/auth.controller';
import validate from '../validation/auth.validate';
import middleware from '../middleware/auth.middleware';
import isManage from '../middleware/user.middleware';

const router = express.Router();

router.get('/login', middleware.isAuth, controller.login);
router.post('/login', controller.loginPost);
router.get('/logout', controller.logout);
router.get('/register', isManage.requireManage, controller.register);
router.post('/register', validate.createRegister, controller.createRegister);

module.exports = router;