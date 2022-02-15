import axios from "axios";

const loginUrl = 'https://hazmanot-il.herokuapp.com/auth/login';
const registerUrl = 'https://hazmanot-il.herokuapp.com/auth/register';
const userUrl = 'https://hazmanot-il.herokuapp.com/user/';

export const userLogin = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(loginUrl, FrmData)
            resolve(res.data);
            if(res.status === 200){
                sessionStorage.setItem("accessToken",
                res.data.accessToken);
                sessionStorage.setItem("userID",
                res.data._id);
            }
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
            if(res.status === 200){
                sessionStorage.setItem("accessToken",
                res.data.accessToken);
                sessionStorage.setItem("userID",
                res.data._id);
            }
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