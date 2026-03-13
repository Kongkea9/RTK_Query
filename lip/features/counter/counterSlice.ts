// import { counterSlice } from './counterSlice';
// // define type of initialState

// import { createSlice } from "@reduxjs/toolkit"

// interface CounterState {
//     value: number
// }

// //1. initialize state
// const initialState: CounterState = {
//     value: 0
// }

// //2. create reducer(slice)

// export const counterSlice = createSlice({
//     name: "counter",
//     initialState,
//     reducers:{
//         increment:(state) =>{
//             state.value += 1
//         }
//     }

// })

// // 3. export action

// export const {increment} = counterSlice.actions

// // 4. expot reducer
// export default counterSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
