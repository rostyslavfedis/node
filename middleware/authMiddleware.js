const jwt = require('jsonwebtoken');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                res.json('Token is required');
            }

            jwt.verify(access_token, 'JWT_ACCESS', (err) => {
                if (err) {
                    throw new Error('Not valid token');
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');
            if (!tokens) {
                throw new Error('Not valid token');
            }

            console.log('*************************************************************************');
            console.log(tokens);
            console.log('*************************************************************************');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
