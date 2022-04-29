import {configureStore} from "@reduxjs/toolkit";

import authSlice from './Slices/authSlice'
import userSlice from './Slices/userSlice'
import inviteSlice from './Slices/inviteSlice'
import mobileSlice from './Slices/mobileSlice'

const store = configureStore({
    reducer: {
        mobile: mobileSlice,
        auth: authSlice,
        user: userSlice,
        invite: inviteSlice
    },
});

export default store;