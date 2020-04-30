import express from 'express';
import controller from '../controllers/user.controller';
import validate from '../validation/user.validate';
import isManage from '../middleware/user.middleware';

const router = express.Router();
// get all User
router.get('/', isManage.requireManage, controller.viewUser);
// update user
router.get('/update/:id', isManage.requireManage, controller.getUpdateUser);
router.post('/update/:id', validate.updateUser, controller.updateUser);
// set Password defautl
router.get('/set-password/:id', isManage.requireManage, controller.setDefaulPassword);
// update 
router.get('/change-password', controller.getChangePassword)
router.post('/change-password', validate.changePassword, controller.changePassword);
// update information for user
router.get('/update-info', controller.getUpdateInfor);
router.post('/update-info/:id', validate.updateInfoUser, controller.updateInfoUser);
// delete user : id
router.get('/delete/:id', isManage.requireManage, controller.deleteUser);
// search user 
router.get('/search', isManage.requireManage, controller.searchUser);

module.exports = router;