import { createSlice } from "@reduxjs/toolkit";

let initialState;

if (typeof window !== "undefined") {
  initialState = JSON.parse(window.localStorage.getItem("authbooking"));
} else {
  initialState = null;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser: (_, action) => {
      return action.payload;
    },
    logOutUser: (_, action) => {
      return action.payload;
    },
  },
});

export const { logOutUser, loggedInUser } = userSlice.actions;
export default userSlice.reducer;
