
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import '../styles/checkout.css'
import axios from '../api/axiosConfig';

const Checkout = () => {
    const { id } = useParams();
    const [product, setproduct] = useState("");
    const [showAddress, setshowAddress] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    
    const navigateHandler = (id ) => {
        if(user.mobile === "" && user.address === "") {
            alert("Enter User Details")
            return
        }
        navigate(`/Checkout/invoice/${id}` , {state: {quantity:quantity}})
    }
    let [qauntityP, setqauntityP] = useState(1)
    const [address, setaddress] = useState({
        address: ""
    })
    useEffect(() => {
        if (user) {
            setaddress({
                address: user.address || ""
            })
        }
    }, [])

    const [showNumber, setshowNumber] = useState(false);
    const [number, setnumber] = useState("")

    const numberSave = async () => {
        try {
            const newMobile = { ...user, mobile: number }
            localStorage.setItem("user", JSON.stringify(newMobile))
            await axios.patch(`/users/${user.id}`, {mobile:number})
            setshowNumber(false);
        } catch (error) {
            console.log(error);
        }
    };


    const numberChange = () => {
        setshowNumber(!showNumber);
    };
    const addressSave = async () => {
        try {
            const addAddress = { ...user, address: address.address }
            localStorage.setItem("user", JSON.stringify(addAddress))
            await axios.patch(`/users/${user.id}`, {
                address: address.address
            })
            setshowAddress(false);
        } catch (error) {
            console.log(error)
        }
    }
    const addressChange = () => {
        setshowAddress(!showAddress);
    }

    const add = () => {
        setqauntityP(qauntityP = qauntityP + 1)
    }
    const sub = () => {
        setqauntityP(qauntityP > 1 ? qauntityP = qauntityP - 1 : 1)
    }


    const price = Number(product.productPrice) || 0
    const quantity = Number(qauntityP)
    const totalAmount = price * quantity



    useEffect(() => {
        if (user?.Cart && id) {
            const matchedProduct = user.Cart.find(item => item.id == id);
            setproduct(matchedProduct);
        }
    }, [id])


    return (
        <div className='checkoutPage '>
            <div className="left">

                <div className="layer1 flex justify-between">
                    <div className="box">
                        <h1>LOGIN:</h1>
                        <p>{user.name}</p>
                        
                        <p>
                            {showNumber ? (
                                <input type="number"
                                required
                                    value={number}
                                    placeholder='Number Valid'
                                    onChange={(e) => setnumber(e.target.value)}
                                />
                            ) : (
                                user.mobile ? user.mobile : " Not Defined"
                            )}
                        </p>

                    </div>
                    <button onClick={showNumber ? numberSave : numberChange} className='bg-zinc-200'>{showNumber ? "Save" : "Change"}</button>
                </div>
                <div className="layer2 ">
                    <div className="box">
                        <h1>Delivery Address:</h1>
                        <p>
                            {showAddress ? (
                                <input type="text"
                                    value={address.address}
                                    placeholder='Address Valid'
                                    onChange={(e) => setaddress({ ...address, address: e.target.value })}
                                />
                            ) : (
                                user.address ? user.address : " Not Defined"
                            )}
                        </p>
                    </div>
                    <button onClick={showAddress ? addressSave : addressChange} className='bg-zinc-200'>{showAddress ? "Save" : "Change"}</button>
                </div>
                <div className="layer3 ">
                    <h1>Order Summary</h1>
                    <div className="data">
                        <div className="image">
                            <img src={product.productImageURL?.[0]} alt="" />
                        </div>
                        <div className="info">
                            <h2>{product.productName}</h2>
                            <div className="quantity flex gap-2">
                                <button
                                    className='bg-blue-600'>Quantity: {quantity}
                                </button>
                                <button
                                    onClick={() => add()}
                                    className=' bg-blue-600'>+</button>
                                <button
                                    onClick={() => sub()}
                                    className=' bg-blue-600'>-</button>
                            </div>
                            <p>Seller: helloworld</p>
                            <h3>${price}</h3>
                            <p>Delevery <span> by tomorrow</span> </p>
                        </div>
                    </div>
                </div>
                <div className="layer4 flex justify-between ">
                    <p>Order Confirmation Email Will Be Sent To <span>
                        {user.email ? user.email : "Not given"}
                    </span></p>
                    <button onClick={()=> navigateHandler(product.id , quantity)}>Continue</button>
                </div>


            </div>
            <div className="right">
                <div className="box">
                    <div className="head">
                        <h1>PriceDetail</h1>
                    </div>
                    <hr />
                    <div className="priceDetail">
                        <div className="b1">
                            <h2>Price</h2>
                            <p>${totalAmount}</p>
                        </div>
                        <div className="b2">
                            <h2>Delivery Charge</h2>
                            <p>Free</p>
                        </div>
                        <div className="b3">
                            <h2>Plateform Fee</h2>
                            <p>Free</p>
                        </div>
                    </div>
                    <hr />
                    <div className="price">
                        <h1>Total Payable</h1>
                        <p>${totalAmount}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout
