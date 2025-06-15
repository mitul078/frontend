import axios from "../api/axiosConfig";
import { loadCart } from '../features/cartSlice'

export const addCart = (product) => async(dispatch) =>{
    try {
        const {data} = await axios.post('/users' , product)
        console.log(data)
        dispatch(loadCart(data))
    } catch (error) {
        console.log(error)
    }
}