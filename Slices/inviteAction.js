import {invitePending , inviteLink , inviteFail} from './inviteSlice'
import {newInvite, allInvList} from '../api/inviteApi'


export const getInviteLink= () => async (dispatch) =>{
    try {
        dispatch(invitePending());
        const inv = await newInvite()
        console.log(inv);
        if(inv){
            console.log('seccess')
            return dispatch(inviteLink(inv));
        }
        dispatch(inviteFail('invite not found'))
    } catch (error) {
        dispatch(inviteFail(error))
    }
}

export const getInviteList= () => async (dispatch) =>{
    try {
        dispatch(invitePending());
        const inv = await allInvList()
        console.log(inv);
        if(inv){
            console.log('seccess')
            return dispatch(inviteLink(inv));
        }
        dispatch(inviteFail('invite not found'))
    } catch (error) {
        dispatch(inviteFail(error))
    }
}