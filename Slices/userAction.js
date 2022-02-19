import {getUserPending, getUserSuccess, getUserFail} from './userSlice'
import {fetchUser, userVerify} from '../api/userApi'
import {authFail, authSuccess, authPending} from '../Slices/authSlice'


export const getUserProfile= () => async (dispatch) =>{
    try {
        dispatch(getUserPending());
        const user = await fetchUser()
        if(user && user._id){
            return dispatch(getUserSuccess(user));
        }
        dispatch(getUserFail('user not found'));
    } catch (error) {
        dispatch(getUserFail(error))
        dispatch(authFail(error))
    }
}

export const getUserVerified = (email,token) => async (dispatch) =>{
    try {
        dispatch(authPending());
        const verify = await userVerify({
            email: email,
            key: token,
        })
        if(verify.massage){
            return dispatch(authFail('הקוד שגוי או שפג תוקפו'));
        }
        if(verify.isValid === false){
            return dispatch(authFail('הקוד שגוי או שפג תוקפו'));
        }
        sessionStorage.setItem("accessToken", verify.accessToken);
        sessionStorage.setItem("userID", verify._id);
        dispatch(getUserProfile());
        dispatch(authSuccess());
    } catch (error) {
        dispatch(authFail(error))
    }
}