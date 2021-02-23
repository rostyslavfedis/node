const router = require('express').Router();

const userController =require('../controller/user.controller')
const userMiddleware =require('../middleware/user.middleware')


router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsValid, userController.getSingleUser);

router.post('/', userMiddleware.userIsValid, userMiddleware.PasswordIsValid, userController.createUser);

router.delete('/:userId',userMiddleware.userIsValid, userController.deleteUser);

router.get('/filter/:username',userMiddleware.userIsValid, userController.getUserByUsername);

module.exports = router;
