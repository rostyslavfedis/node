const { Schema, model } = require('mongoose');

// eslint-disable-next-line no-unused-vars
const carSubScheme = {
    model: { type: String },
    price: { type: Number }
};

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    _cars: [{ type: Schema.Types.ObjectId }]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('full_name').get(function() {
    return `${this.name} ${this.password}`;
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id'
});

userScheme.pre('find', function() {
    this.populate('userCars');
});

module.exports = model('User', userScheme);
