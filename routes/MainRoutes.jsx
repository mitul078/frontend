import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../pages/Register'
import Login from '../components/Login'
import Profile from '../pages/Profile'
import Cart from '../components/Cart'
import Product from '../components/Product'
import CreateProduct from '../pages/CreateProduct'
import ProductDetail from '../pages/ProductDetail'
import Checkout from '../pages/Checkout'
import Invoice from '../pages/Invoice'
import End from '../pages/End'
const MainRoutes = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Product' element={<Product />} />
                <Route path='/Product/ProductDetail/:id' element={<ProductDetail />} />
                <Route path='/Cart' element={<Cart />} />
                <Route path='/Checkout/:id' element={<Checkout />} />
                <Route path='/Checkout/:id/Final' element={<End />} />
                <Route path='Checkout/invoice/:id' element={<Invoice />} />
                <Route path='/CreateProduct' element={<CreateProduct />} />
            </Routes>
        </>
    )
}

export default MainRoutes
