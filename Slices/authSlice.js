import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoading: false,
    isAuth: false,
    aError:"",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        authPending:(state) => {
            state.isLoading = true;
        },
        authSuccess:(state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.aError ="";
        },
        authLogout:(state) => {
            state.isAuth = false;
            state.aError ="";
        },
        authFail:(state, {payload}) => {
            state.isLoading = false;
            state.aError = payload;
        },
        authClear:(state) => {
            state.aError = "";
        },
    }
});

const {reducer, actions} = authSlice

export const {authLogout, authPending , authSuccess , authFail, authClear} = actions;
export default reducer;