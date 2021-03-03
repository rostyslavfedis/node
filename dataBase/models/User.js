const { Schema, model } = require('mongoose');
const { constants } = require('../../constant');

const carSubScheme = {
    model: { type: String },
    price: { type: Number }
};

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    password: { type: String, required: true },
    email: { type: String },
    _cars: [carSubScheme]
});

module.exports = model(constants.USER, userScheme);
