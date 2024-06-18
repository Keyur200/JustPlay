import {configureStore } from '@reduxjs/toolkit'
import SearchSlice from './SearchSlice'
export const store = configureStore({
    reducer: {
        search: SearchSlice,
    }
})