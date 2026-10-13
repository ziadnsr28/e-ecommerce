import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    count:0
}
const countSlice = createSlice({
    name:"count",
    initialState,
    reducers: {
        increment: (state) => {
            state.count++;
        },
        MYincrement: (state,action) => {
           state.count += action.payload
        },
        decrement: (state) => {
            state.count--;
        }
    }
})
export const countReducer = countSlice.reducer;
export const { increment, decrement , MYincrement} = countSlice.actions;
