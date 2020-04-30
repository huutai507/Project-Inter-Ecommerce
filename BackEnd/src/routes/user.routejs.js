import express from 'express';
import controller from '../controllers/user.controller';
import validate from '../validation/user.validate';
import isManage from '../middleware/user.middleware';

const router = express.Router();
// get all User
router.get('/', controller.viewUser);
// update user
router.get('/update/:id', controller.getUpdateUser);
router.post('/update/:id', controller.updateUser);
// set Password defautl
router.post('/set-password/:id', controller.setDefaulPassword);
// update 
router.get('/change-password', controller.getChangePassword)
router.post('/change-password', controller.changePassword);
// update information for user
router.get('/update-info/:id', controller.getUpdateInfor);
router.post('/update-info/:id', controller.updateInfoUser);
// delete user : id
router.get('/delete/:id', controller.deleteUser);
// search user 
router.get('/search', controller.searchUser);

module.exports = router;