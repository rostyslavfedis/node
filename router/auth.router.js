const router = require('express').Router();

const { authController } = require('../controller');

// eslint-disable-next-line no-unused-vars
const { authMiddleware } = require('../middleware');

router.post('/', authController.authController);

module.exports = router;
