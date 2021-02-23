const userService = require('../service/user.service')

module.exports={
    getAllUsers: async (req,res)=>{
        try{
            const users = await userService.findUsers()
            res.json(users);
        }catch (e) {
            res.status(400).json(e.message);
        }
    },
    getSingleUser: async (req,res)=>{
        try{
            const {userId} = req.params;
            const user =await userService.findUserById(userId);

            res.json(user)
        }catch (e) {
         res.status(400).json(e.message)
        }

    },
    createUser: async (req,res)=>{
        try {
            const { username, password } = req.body;
            const user = {username, password}
            await userService.createUser(user);
            res.status(201).json('User is created');
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },
    deleteUser: async (req,res)=>{
        try {
            const { userId } = req.params;
            await userService.deleteUser(userId);

            res.status(200).json('User is deleted');
        }
        catch (e) {
            res.status(400).json(e.message);
        }
        },
    getUserByUsername: async (req, res) => {
            try {
                const { username } = req.params;
                const user = await userService.findUserByUsername(username);

                res.status(200).json(user);
            }
            catch (e) {
                res.status(400).json(e.message);
            }
        },
}
