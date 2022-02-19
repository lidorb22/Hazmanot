import axios from "axios";

const loginUrl = 'https://hazmanot-il.herokuapp.com/auth/login';
const registerUrl = 'https://hazmanot-il.herokuapp.com/auth/register';
const userUrl = 'https://hazmanot-il.herokuapp.com/user/';
const verifyUrl = 'https://hazmanot-il.herokuapp.com/auth/authorized';

export const userLogin = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(loginUrl, FrmData)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
};

export const userRegister = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(registerUrl, FrmData)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
};

export const fetchUser = () =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const accessToken = sessionStorage.getItem('accessToken')
            if(!accessToken){
                reject("Token not found!")
            }
            const root = sessionStorage.getItem('userID')

            const res = await axios.get(userUrl + root, { 
                headers: {
                    token: accessToken
                }
            })
            resolve(res.data);
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    })
};

export const userVerify = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(verifyUrl, FrmData)
            if(res.status === 200){
                resolve(res.data);
            }
        } catch (error) {
            reject(error);
        }
    })
};