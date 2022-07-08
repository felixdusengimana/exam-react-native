import axios from 'axios';
import API_URL from '../../config/api-url';
import * as SecureStorage from 'expo-secure-store'

export const register = async (data) => {
    return axios.post(API_URL+'/auth/signup', data)
    .then((res) => {
        
        return res?.data
    })
    .catch((err) => {
        return err?.response?.data;
    }
    )
    
}

export const login = async (data) => {
    return axios.post(API_URL+'/auth/signin', data)
    .then((res) => {
        return res?.data
    })
    .catch((err) => {
        console.log("Error::: "+err);
        return err?.response?.data;
    }
    )
    
}

export const getProfile = async () => {
    return axios.get(API_URL+'/auth/profile', {
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


export const _getToken = async () => {
    return await SecureStorage.getItemAsync('token');
}

export const isLoggedIn = async () => {
    const token = await _getToken('token');
    return token ? true : false;
}