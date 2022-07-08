import mongoose from 'mongoose';
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Schema = mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    nationalId: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    votedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }
})

const User = mongoose.model('User', Schema);
export default User;

exports.validateUser = function (user) {
    const schema = Joi.object({
        names: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        nationalId: Joi.string().min(16).max(16).required(),
        isAdmin: Joi.boolean(),
    })
    return schema.validate(user);
}

exports.validateLogin = function (user) {
    const schema = Joi.object({
        email: Joi.string().email(),
        phone: Joi.string(),
        password: Joi.string().min(3),
    })
    return schema.validate(user);
}