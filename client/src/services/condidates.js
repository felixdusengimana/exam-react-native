import axios from 'axios';
import { Alert } from 'react-native';
import API_URL from '../config/api-url';
import { _getToken } from './auth';

export const getAllCandidates = async () => {
    return axios.get(API_URL+'/vote/candidates', {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}

export const addCandidate = async (data) => {
    return axios.post(API_URL+'/candidate', data, {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}


export const voteForCandidates = async (data) => {
    return axios.post(API_URL+'/vote', data,{
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}

export const userVotedForCandidate = async (userId) => {
    return axios.get(API_URL+'/vote/user/'+userId, {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}

export const candidateNumberOfVotes = async () => {
    return axios.get(API_URL+'/candidate/votes', {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}

