
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";
import {  setLogin } from "./userSlice";

export const loginUser = (user, navigate) => async (dispatch) => {
    try {
        const res = await axios.get(`/users?name=${user.name}`)
        const  foundUser= res.data[0];
        if (foundUser) {
            toast.success("Login successful! 🎉");
            dispatch(setLogin(foundUser));
            localStorage.setItem("isLogin" , "true")
            localStorage.setItem("user" , JSON.stringify(foundUser))
            navigate("/")
        }
        else {
            toast.error("Enter valid username")
        }

    } catch (e) {
        toast.error("Something went wrong 😢")
        console.log(e)
    }
}



const addUserData = (user) => async () => {
    try {
        await axios.post("/users", user);
    } catch (error) {
        console.log(error)
    }
}

export default addUserData;