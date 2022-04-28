import {getUserPending, getUserSuccess, getUserFail} from './userSlice'
import {fetchUser} from '../api/userApi'
import {authFail, authSuccess } from '../Slices/authSlice'


export const getUserProfile= () => async (dispatch) =>{
    try {
        dispatch(getUserPending());
        const user = await fetchUser()
        if(user && user._id){
            dispatch(getUserSuccess(user));
            dispatch(authSuccess());
            return;
        }
        dispatch(getUserFail('user not found'));
    } catch (error) {
        dispatch(getUserFail("invalid token"))
        dispatch(authFail("invalid token"))
    }
}