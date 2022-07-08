import Candidate from '../database/models/candidate.model';

import status  from '../helpers/status-codes'

const { CREATED, OK, BAD_REQUEST, UNAUTHORIZED } = status;

//find candidate by userId
export const  findByUserId = async (req, res) => {
    const candidate = await Candidate.findOne({
        _id: req.params.id
    });

    if (!candidate) {
        return res.json({ success: false, message: 'Candidate doesnt exist'}).status(BAD_REQUEST);
    }

    return res.json({ success: true, data: candidate, message: ''}).status(OK);
}

export const  getAll = async (req, res) => {

    const candidates = await Candidate.find();
    return res.json({ success: true, data: candidates, message: ''}).status(OK);

}

export const  create = async (req, res) => {
    const candidate = new Candidate(req.body);
    try{
        const Savedcandidate = await candidate.save(req.body);
        return res.json({ success: true, message: 'Candidate created successfully', data: Savedcandidate }).status(CREATED);
    }
    catch(err){
        console.log(err);
        return res.json({ success: false, message: 'Error creating candidate', error: err }).status(BAD_REQUEST);
    }

}


export const  update = async (req, res) => {
    const candidateExists = await Candidate.findOne({
        _id: req.params.id
    });

    if (!candidateExists) {
        return res.json({ success: false, message: 'Candidate doesnt exist'}).status(BAD_REQUEST);
    }
    const updatedcandidate = await Candidate.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.json({ success: true, message: 'Candidate updated successfully', data: updatedcandidate }).status(CREATED);
}
export const  deleteCandidate = async (req, res) => {
    const candidateExists = await Candidate.findOne({
        _id: req.params.id
    })
    if (!candidateExists) {
        return res.json({ success: false, message: 'Candidate doesnt exist'}).status(BAD_REQUEST);
    }
    const deleted = await Candidate.findOneAndRemove({ _id: req.params.id });
    return res.json({ success: true, message: 'Candidate deleted successfully', data:  deleted}).status(CREATED);
}