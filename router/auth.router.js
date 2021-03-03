const router = require('express').Router();

const { User } = require('../dataBase/models');
const { passwordsHasher } = require('../helper');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('NO FOUND');
    }

    passwordsHasher.compare(password, user.password);

    res.json('OK');
});

module.exports = router;
