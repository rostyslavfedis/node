const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getSingleUser);

router.post('/', userMiddleware.isUserValid, userController.createUser);

module.exports = router;
