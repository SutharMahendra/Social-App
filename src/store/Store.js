import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from '../Feature/AuthSlice'
const store = configureStore({
    reducer: AuthSlice

})

export default store