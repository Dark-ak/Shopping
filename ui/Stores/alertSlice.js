const {createSlice} = require("@reduxjs/toolkit")

const initialState = ""

const alertSlice = createSlice({
    name: "alerts",

    initialState,

    reducers: {
        set(state,action){
            return action.payload
        },

        empty(state){
            return ""
        },
    }
})

export const {set, empty} = alertSlice.actions

export default alertSlice.reducer