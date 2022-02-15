import axios from "axios";

const loginUrl = 'http://localhost:5000/auth/login';
const registerUrl = 'http://localhost:5000/auth/register';
const userUrl = 'http://localhost:5000/user/';

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