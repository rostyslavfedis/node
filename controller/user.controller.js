const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await userService.findUsers();
            res.json(allUsers);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json.message(e);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(201).json('USer was Created');
        } catch (e) {
            res.json(e);
        }
    }
};
