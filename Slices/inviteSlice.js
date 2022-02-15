import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    link:{},
    invInfo:[],
    isLoading: false,
    error:"",
};

const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers:{
        invitePending:(state) => {
            state.isFirstTime= false;
            state.isLoading = true;
            state.error ="";
        },
        inviteReset:(state) => {
            state.isLoading = false;
            state.link ={};
            state.error ="";
        },
        inviteResetList:(state, {payload}) => {
            state.isLoading = false;
            state.invInfo = payload;
            state.error ="";
        },
        inviteLogout:(state) => {
            state.isLoading = false;
            state.link ={};
            state.invInfo=[];
            state.error ="";
        },
        inviteLink:(state , {payload}) => {
            state.isLoading = false;
            state.link = payload;
            state.error = '';
        },
        inviteInfo:(state , {payload}) => {
            state.isLoading = false;
            state.invInfo = [...state.invInfo, payload];
            state.error = '';
        },
        inviteFail:(state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
});

const {reducer, actions} = inviteSlice

export const {inviteResetList,inviteLogout, inviteInfo,inviteReset,invitePending , inviteLink , inviteFail} = actions;
export default reducer;