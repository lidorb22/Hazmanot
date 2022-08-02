import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:{},
    isLoading:false,
    uError:'',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        getUserPending:(state) => {
            state.isLoading = true;
        },
        getUserSuccess:(state , {payload}) => {
            state.isLoading = false;
            state.user = payload
            state.uError = '';
        },
        getUserLogout:(state ) => {
            state.isLoading = false;
            state.user = {};
            state.uError = '';
        },
        getUserFail:(state , {payload}) => {
            state.isLoading = false;
            state.uError = payload;
        },
        getUserClear:(state) => {
            state.uError = "";
        },
    }
});

export const {getUserLogout, getUserPending, getUserSuccess, getUserFail,getUserClear} = userSlice.actions

export default userSlice.reducer