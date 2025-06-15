import React from 'react'
import '../styles/end.css'
import { useNavigate } from 'react-router-dom'
const End = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const navigateHandler = () => {
        navigate("/")
    }
    return (
        <div className='End'>
            <div className="end-container">
                <p> Hi , <span className='text-blue-400'>{user.name}</span> <br />Thank you for shopping with us! We’re getting your order ready to be shipped. <br /> We’ll notify you when it has been sent.
                    <br /> We appreciate your support!”</p>
            <button onClick={()=> navigateHandler()} className='bg-blue-600'>Continue to Home</button>
            </div>
        </div>
    )
}

export default End
