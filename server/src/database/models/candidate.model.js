import mongoose from 'mongoose';
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Schema = mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    nationalId:{
        type: String,
        required: true,
        unique: false
    },
    profilePic: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mission:{
        type: String,
        required: true
    },
})

const Candidate = mongoose.model('Candidate', Schema);
export default Candidate;

exports.validateCandidate = function (candidate) {
    const schema = Joi.object({
        names: Joi.string().min(3).required(),
        nationalId: Joi.string().min(16).max(16).required(),
        profilePic: Joi.string().required(),
        gender: Joi.string().required(),
        mission: Joi.string().min(10).required()
    })
    return schema.validate(candidate);
}
