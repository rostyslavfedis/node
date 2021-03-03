const router = require('express').Router();
const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:id', userMiddleware.isUserValid, userController.getSingleUser);

router.post('/', userMiddleware.ifUserExists, userController.createUser);

module.exports = router;
