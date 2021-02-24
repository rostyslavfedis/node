const path = require('path');
const {promisify} = require('util');
const fs = require('fs');

const errorMessage = require('../error/error.messages');
const dataBase = path.join(process.cwd(), 'dataBase', 'users.json');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports= {
    findUsers:async ()=>{
        const users = await readFile(dataBase);

        return JSON.parse(users.toString());
    },

    findUserById: async (userId,preferL) => {
        const users = await readFile(dataBase);
        const user = JSON.parse(users.toString())[userId];

        if(!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL]);
        }
        return user;
    },

    createUser:async (userObject)=>{
        const users= await readFile(dataBase);
        const DB = JSON.parse(users.toString());

        DB.push(userObject);

        await writeFile(dataBase, JSON.stringify(DB));
    },
    deleteUser:async (userId)=>{
        const users = await readFile(dataBase);
        const DB = JSON.parse(users.toString());

        DB.splice(userId, 1);
        await writeFile(dataBase, JSON.stringify(DB));
    },
    findUserByUsername: async (username, preferL ) => {
        const users = await readFile(dataBase);
        const DB = JSON.parse(users.toString());

        const user = DB.find(user => user.username === username);

        if(!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL]);
        }

        return user;
    },
    findUserByEmail: async (email, preferL ) => {
        const users = await readFile(dataBase);
        const DB = JSON.parse(users.toString());

        const user = DB.find(user => user.email === email);

        if(!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL]);
        }

        return user;
    }
}
