import {configureStore} from "@reduxjs/toolkit";

import authSlice from './Slices/authSlice'
import userSlice from './Slices/userSlice'
import inviteSlice from './Slices/inviteSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        invite: inviteSlice
    },
});

export default store;