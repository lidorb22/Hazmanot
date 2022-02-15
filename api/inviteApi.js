import axios from "axios";

const inviteUrl = 'http://localhost:5000/invite/create';
const allINVUrl = 'http://localhost:5000/invite/allItems';
const iNVUrl = 'http://localhost:5000/invite/item';
const delInvUrl = 'http://localhost:5000/invite/delItem';

export const newInvite = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(inviteUrl, FrmData)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
};

export const allInvList = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(allINVUrl, FrmData)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
};

export const InvObj = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(iNVUrl, FrmData)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
};

export const InvDelete = FrmData =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const res = await axios.post(delInvUrl, FrmData)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
};