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

export const addComming= (id,option,fullName,number,relation,side, massage) => async (dispatch) =>{
    try {
        await commingCount({
            id: id,
            option: option,
            fullName: fullName,
            number: number,
            relation: relation,
            side: side,
            massage: massage,
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