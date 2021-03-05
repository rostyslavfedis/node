const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getSingleUser);

router.delete('/:id', authMiddleware.checkAccessToken, userController.deleteSingleUser);

router.post('/',
    userMiddleware.isLoginExisted,
    userMiddleware.isEmailCreated,
    userMiddleware.isUserValid,
    userController.createUser);

module.exports = router;
