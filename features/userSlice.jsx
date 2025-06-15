import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    users: [],
    isLogin: localStorage.getItem("isLogin") === "true",
    isAdmin: localStorage.getItem("isAdmin") === "true",
    name: "",
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadUser: (state, action) => {
            state.users = action.payload
        },
        
        setLogin: (state, action) => {
            state.isLogin = true;
            state.name = action.payload.name
            state.isAdmin = action.payload.isAdmin

            localStorage.setItem("isAdmin", action.payload.isAdmin ? "true" : "false")
        },
        setLogout: (state) => {
            state.isLogin = false
            state.isAdmin = false
            state.name = ""
        }
    }
})
export const { loadUser, setLogin, setLogout, checkAdmin } = userSlice.actions;

export default userSlice.reducer;


