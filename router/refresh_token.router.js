const router = require('express').Router();

const { refresh_tokenController } = require('../controller');

// const { authMiddleware } = require('../middleware');

router.post('/:id', refresh_tokenController.findUser);

module.exports = router;
