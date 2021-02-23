const erroeCodes = require('../constant/errorCodes.enum')
const erroeMessages =require ('../error/error.messages')

module.exports={
    checkIsValid:(req,res,next)=>{
        try{
            const userId = +req.params.userId;
            const {preferL = 'ua'}=req.body;

            if (userId < 0 || !Number.isInteger(userId)|| Number.isNaN(userId)){
                throw new Error(erroeMessages.ID_IS_INVALID[preferL])
            }
            next();
        }catch (e) {
            res.status(erroeCodes.BAD_REQUEST).json(e.message)
        }
    },
    userIsValid:(req,res,next)=>{
        try{
            const {username, password, preferL = 'ua'} = req.body;


            if (!username) {
                throw new Error(erroeMessages.NOT_USERNAME[preferL]);
            }

            if (password.length < 6){
                throw new Error(erroeMessages.TOO_WEAK_PASSWORD[preferL]);
            }
            next();
        }catch (e) {
            res.status(erroeCodes.BAD_REQUEST).json(e.message)
        }
    },
    PasswordIsValid: (req, res, next) => {
        try {
            const { password, preferL = 'ua' } = req.body;

            if (!password) {
                throw new Error(erroeMessages.NOT_PASSWORD[preferL]);
            }

            if (password.length < 8) {
                throw new Error(erroeMessages.TOO_WEAK_PASSWORD[preferL]);
            }

            next();
        } catch (e) {
            res.status(erroeCodes.BAD_REQUEST).json(e.message);
        }
    },
}
