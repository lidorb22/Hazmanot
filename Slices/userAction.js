import {getUserPending, getUserSuccess, getUserFail} from './userSlice'
import {fetchUser} from '../api/userApi'
import {authFail} from '../Slices/authSlice'


export const getUserProfile= () => async (dispatch) =>{
    try {
        dispatch(getUserPending());
        const user = await fetchUser()
        if(user && user._id){
            return dispatch(getUserSuccess(user));
        }
        dispatch(getUserFail('user not found'))
    } catch (error) {
        dispatch(getUserFail(error))
        dispatch(authFail(error))
    }
}