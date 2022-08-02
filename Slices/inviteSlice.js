import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    link:{},
    invInfo:[],
    isLoading: false,
    iError:"",
};

const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers:{
        invitePending:(state) => {
            state.isFirstTime= false;
            state.isLoading = true;
            state.iError ="";
        },
        inviteReset:(state) => {
            state.isLoading = false;
            state.link ={};
            state.iError ="";
        },
        inviteResetList:(state, {payload}) => {
            state.isLoading = false;
            state.invInfo = payload;
            state.iError ="";
        },
        inviteLogout:(state) => {
            state.isLoading = false;
            state.link ={};
            state.invInfo=[];
            state.iError ="";
        },
        inviteLink:(state , {payload}) => {
            state.isLoading = false;
            state.link = payload;
            state.iError = '';
        },
        inviteInfo:(state , {payload}) => {
            state.isLoading = false;
            state.invInfo = [...state.invInfo, payload];
            state.iError = '';
        },
        inviteFail:(state, {payload}) => {
            state.isLoading = false;
            state.iError = payload;
        },
        inviteClear:(state) => {
            state.iError = "";
        },
    }
});

const {reducer, actions} = inviteSlice

export const {inviteResetList,inviteLogout, inviteInfo,inviteReset,invitePending , inviteLink , inviteFail, inviteClear} = actions;
export default reducer;