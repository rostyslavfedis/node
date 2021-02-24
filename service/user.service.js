const path = require('path');
const {promisify} = require('util');
const fs = require('fs');

const errorMessage = require('../error/error.messages');
const dataBase = path.join(process.cwd(), 'dataBase', 'users.json');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports= {
    findUsers:async ()=>{
        const buf = await readFile(dataBase);

        return JSON.parse(buf.toString());
    },

    findUserById: async (userId,preferL) => {
        const buf = await readFile(dataBase);
        const user = JSON.parse(buf.toString())[userId];

        if(!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL]);
        }
        return user;
    },

    createUser:async (userObject)=>{
        const buf= await readFile(dataBase);
        const DB = JSON.parse(buf.toString());

        DB.push(userObject);

        await writeFile(dataBase, JSON.stringify(DB));
    },
    deleteUser:async (userId)=>{
        const buf = await readFile(dataBase);
        const DB = JSON.parse(buf.toString());

        DB.splice(userId, 1);
        await writeFile(dataBase, JSON.stringify(DB));
    },
    findUserByUsername: async (username, preferL ) => {
        const buf = await readFile(dataBase);
        const DB = JSON.parse(buf.toString());

        const user = DB.find(user => user.username === username);

        if(!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL]);
        }

        return user;
    },
    findUserByEmail: async (email, preferL ) => {
        const buf = await readFile(dataBase);
        const DB = JSON.parse(buf.toString());

        const user = DB.find(user => user.email === email);

        if(!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL]);
        }

        return user;
    }
}
