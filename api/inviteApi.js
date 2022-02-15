import axios from "axios";

const inviteUrl = 'https://hazmanot-il.herokuapp.com/invite/create';
const allINVUrl = 'https://hazmanot-il.herokuapp.com/invite/allItems';
const iNVUrl = 'https://hazmanot-il.herokuapp.com/invite/item';
const delInvUrl = 'https://hazmanot-il.herokuapp.com/invite/delItem';

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