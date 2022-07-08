import Candidate from "../database/models/candidate.model"
import User from "../database/models/user.model"
import Vote from "../database/models/vote.model"
import { CREATED, OK, BAD_REQUEST, UNAUTHORIZED } from "../helpers/status-codes"

export const vote = async (req, res)=>{
    const userExists = User.findOne({
        _id: req.body.userId,
    })

    if (!userExists) {
        return res.json({ success: false, message: 'User doesnt exist'}).status(BAD_REQUEST);
    }
    const candidateExists = Candidate.findOne({
        _id: req.body.candidateId
    })

    if (!candidateExists) {
        return res.json({ success: false, message: 'Candidate doesnt exist'}).status(BAD_REQUEST);
    }

    const vote = new Vote({
        userId: req.body.userId,
        candidateId: req.body.candidateId,
    })

    const alredyVoted = await Vote.findOne({
        userId: req.body.userId,
    })

    if (alredyVoted) {
        return res.json({ success: false, message: 'User already voted'}).status(BAD_REQUEST);
    }

    try{
        const Savedvote = await vote.save(req.body);
        return res.json({ success: true, message: 'Vote created successfully', data: Savedvote }).status(CREATED);
    }
    catch(err){
        console.log(err);
        return res.json({ success: false, message: 'Error creating vote', error: err }).status(BAD_REQUEST);
    }

}

export const getAll = async (req, res)=>{
    const votes = await Vote.find().populate('userId').populate('candidateId');
    return res.json({ success: true, data: votes, message: ''}).status(OK);
}

export const userVoted = async (req, res)=>{
    const userExists = User.findOne({
        _id: req.params.id,
    })

    if (!userExists) {
        return res.json({ success: false, message: 'User doesnt exist'}).status(BAD_REQUEST);
    }
    const voteExists = Vote.findOne({
        userId: req.params.id,
    })
    
    if (!voteExists) {
        return res.json({ success: false, message: 'User has not voted'}).status(BAD_REQUEST);
    }else{
        return res.json({ success: true, voted: true, message: 'User has voted'}).status(OK);
    }
}


export const candidateNumberOfVotes = async (req, res)=>{
    const candidateExists = Candidate.findOne({
        _id: req.params.id,
    })

    if (!candidateExists) {
        return res.json({ success: false, message: 'Candidate doesnt exist'}).status(BAD_REQUEST);
    }

    const votes = await Vote.find({
        candidateId: req.params.id,
    })

    return res.json({ success: true, data: votes.length, message: ''}).status(OK);
}

export const getAllCandidatesVotesNumber = async (req, res)=>{
    const candidates = await Candidate.find();
    const votes = await Vote.find();
    const votesNumber = [];
    candidates.forEach(candidate => {
        const candidateVotes = votes.filter(vote => vote.candidateId.toString() === candidate._id.toString());
        votesNumber.push({
            candidate: candidate,
            votes: candidateVotes.length,
        })
    }
    )
    return res.json({ success: true, data: votesNumber, message: ''}).status(OK);
}