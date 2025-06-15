
import '../styles/cart.css'
import { useEffect, useState } from 'react'
import axios from '../api/axiosConfig'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const [cart, setcart] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))


  useEffect(() => {
    const cartWithQuantity = user.Cart.map(product => ({
      ...product,
      quantity: product.quantity || 1
    }));
    setcart(cartWithQuantity);
  }, [])

  const navigate = useNavigate();
  const navigateHandler = (id) => {
    navigate(`/Checkout/${id}`)
  }

  const removeCartItem = async (id) => {
    const newCart = cart.filter((product) => product.id !== id)
    const user = JSON.parse(localStorage.getItem("user"))
    user.Cart = newCart;
    localStorage.setItem("user", JSON.stringify(user))
    setcart(newCart)
    await axios.patch(`/users/${user.id}`, {
      Cart: newCart
    })
  }




  return (
    <div className="cartPage">
      {cart.length == 0 ? (<p className='p'>Cart is Empty.....</p>) : (
        cart.map((product, i) => (
          <div key={i} className="cartbox">
            <div className="image-box">
              <img src={product.productImageURL[0]} alt="" />
            </div>
            <div className="data">
              <h1>{product.productName}</h1>
              <small>{product.productDescription}</small>
              <button onClick={() => navigateHandler(product.id)} className='bg-blue-600 '>Checkout @{product.productPrice}</button>
              <button onClick={() => removeCartItem(product.id)}>Remove</button>
            </div>
          </div>
        ))
      )
      }
    </div>
  )
}

export default Cart
