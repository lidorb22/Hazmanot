import {invitePending , inviteLink , inviteFail} from './inviteSlice'
import {newInvite, allInvList, commingCount} from '../api/inviteApi'


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

export const addComming= (formType, id, fullName, numberOfPeople) => async (dispatch) =>{
    try {
        await commingCount({
            formType: formType,
            id: id,
            fullName: fullName,
            numberOfPeople: numberOfPeople,
          })
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