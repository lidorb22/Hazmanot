import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoading: false,
    isMobile: null,
    mobileInnerHeight: null,
};

const mobileSlicer = createSlice({
    name: 'mobile',
    initialState,
    reducers:{
        mobileCheck:(state) => {
            state.isLoading = true;
        },
        mobileState:(state, {payload}) => {
            state.isMobile = payload;
        },
        mobileHeight:(state, {payload}) => {
            state.isLoading = false;
            state.mobileInnerHeight = payload;
        },
    }
});

const {reducer, actions} = mobileSlicer

export const {mobileCheck, mobileState, mobileHeight} = actions;
export default reducer;