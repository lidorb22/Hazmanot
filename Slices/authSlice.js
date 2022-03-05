import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoading: false,
    isAuth: false,
    error:"",
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
            state.error ="";
        },
        authLogout:(state) => {
            state.isAuth = false;
            state.error ="";
        },
        authFail:(state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
});

const {reducer, actions} = authSlice

export const {authLogout, authPending , authSuccess , authFail} = actions;
export default reducer;