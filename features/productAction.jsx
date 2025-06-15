
import axios from "../api/axiosConfig";
import { loadProduct } from '../features/productSlice'

const productData = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/products')
        dispatch(loadProduct(data))
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = (product) => async(dispatch) =>{
    try {
        const {data} = await axios.post('/products' , product)
        dispatch(loadProduct(data))
    } catch (error) {
        console.log(error)
    }
}
export const deleteProduct = (id) => async (dispatch) =>{
    try {
        await axios.delete(`/products/${id}`)
        dispatch(deleteProduct(id))
    } catch (error) {
        console.log(error)
        
    }
}


export default productData;