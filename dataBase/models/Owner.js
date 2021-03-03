const { Schema, model } = require('mongoose');

const ownerScheme = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    yearBirthday: { type: Number, default: 2001 }
});

module.exports = model('Owner', ownerScheme);
