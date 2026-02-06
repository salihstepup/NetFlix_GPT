import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  // create slice Creates:
  // reducer
  // action creators
  // action types
  name: "user",
  initialState: null,
  reducers: {
    //we have multiple reducer functions below
    addUser: (state, action) => {
      return action.payload; //updating the state with user data, ee action payload nte result initialstatel verum null maaryt
      //       state → current state (User | null)
      // action.payload → user object
      // We replace state with user data
    },
    removeUser: () => {
      //no state needed //state, action
      return null; //removing user data on logout, setting state back to null
      //       Clears user data
      // Used during logout
      // State becomes null
    },
  },
});

export const { addUser, removeUser } = userSlice.actions; //exporting action creators

export default userSlice.reducer; //exporting the reducer to be used in the store
