import {getUserPending, getUserSuccess, getUserFail} from './userSlice'
import {fetchUser, userVerify} from '../api/userApi'
import {authFail, authSuccess, authPending} from '../Slices/authSlice'


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

export const getUserVerified = (email,token) => async (dispatch) =>{
    try {
        dispatch(authPending());
        const verify = await userVerify({
            email: email,
            key: token,
        })
        if(verify.isValid === true){
            localStorage.setItem("token", verify.accessToken);
            localStorage.setItem("userID", verify._id);
            dispatch(getUserProfile());
        }else{
            dispatch(authFail('הקוד שגוי או שפג תוקפו'));
        }
        
    } catch (error) {
        dispatch(authFail("הקוד שגוי או שפג תוקפו"));
    }
}