import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const checkSlice = createSlice({
    name: "check",
    initialState,

    reducers: {
        change(state){
            return !state
        }
    }
})

export const {change}  = checkSlice.actions
export default checkSlice.reducer