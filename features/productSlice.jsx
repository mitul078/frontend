import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        loadProduct: (state, action) => {
            state.products = action.payload
        },
        DeleteProduct: (state , action) =>{
            const pid = action.payload
            state.products =  state.products.filter((product)=> product.id !== pid)
        }
    }
})

export const {loadProduct  , DeleteProduct} = productSlice.actions;
export default productSlice.reducer;