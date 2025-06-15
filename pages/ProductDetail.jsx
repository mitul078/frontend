import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../api/axiosConfig';
import '../styles/productDetail.css'
import { loadCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate("/login")
    }
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const [mainImage, setMainImage] = useState("");
    const [cartToggle, setcartToggle] = useState(false)
    const isLogin = localStorage.getItem("isLogin")


    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`)
                setProduct(data);

                if (data?.productImageURL?.length > 0) {
                    setMainImage(data.productImageURL[0]);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [id])
    const dispatch = useDispatch();
    const addToCart = async (product) => {
        const result = await dispatch(loadCart(product))
        setcartToggle(true)


        const currentCart = Array.isArray(user.Cart) ? user.Cart : [];
        const isHave = currentCart.some(item => item.id === product.id)

        if (isHave) {
            alert("already in Cart")
            return
        }
        else {
            const updatedCart = [...(currentCart || []), result.payload];
            const updatedUser = {
                ...user,
                Cart: updatedCart
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));

            await axios.patch(`/users/${user.id}`, {
                Cart: updatedCart
            });
        }
    }

    const handleImageClick = (url) => {
        setMainImage(url);
    }
    const [rating, setRating] = useState(0);

    const [addRating, setAddRating] = useState([])
    useEffect(() => {
        if(user){
            setAddRating({
                username: user.name,
                rating: rating
            })
        }
        
    }, [])
    const [submitted, setsubmitted] = useState(false)
    const handleSubmit = async (star) => {
        setRating(star)
        const newRating = {
            username: user.name,
            rating: star
        }

        await axios.patch(`/products/${product.id}`, {
            Rating: [...product.Rating || [], newRating]
        })
        setsubmitted(true)
    }
    useEffect(() => {
        if(user){

            if (product && product.Rating && Array.isArray(product.Rating)) {
                const alreadyRated = product.Rating.some(
                    (r) => r.username === user.name
                );
    
                if (alreadyRated) {
                    setsubmitted(true);
                }
            }
        }
    }, [product])

    if (!product) {
        return <div className='text-8xl text-center text-zinc-700'>Loading...</div>;
    }

    return (
        <div className='productDetailPage'>
            <div className="mainpage">
                <div className="left">
                    <h1 className='name'>{product.productName}</h1>
                    <small className='smalldescription'>small Lorem ipsum dolor sit amet.</small>
                    <h1 className='price'>${product.productPrice}</h1>
                    {isLogin && !submitted && (
                        <div className='rating flex gap-2 items-center '>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}
                                    onClick={() => setRating(star)}
                                    style={{
                                        color: star <= rating ? 'gold' : 'white'
                                    }}
                                >
                                    <i className="ri-star-line text-2xl cursor-pointer"></i>
                                </span>
                            ))}

                            <p className='text-red-800 text-2xl'> {rating === 1 && "Not Good"} </p>
                            <p className='text-red-400 text-2xl'> {rating === 2 && "Avarage"} </p>
                            <p className='text-blue-200 text-2xl'> {rating === 3 && "Good"} </p>
                            <p className='text-green-200 text-2xl' > {rating === 4 && "Very Good"} </p>
                            <p className='text-green-400 text-2xl'> {rating === 5 && "Excellent"} </p>
                            {rating > 0 && (
                                <button onClick={() => handleSubmit(rating)} className='bg-blue-600'>save</button>
                            )}
                        </div>
                    )
                    }
                    {submitted && (
                        <p className="text-green-500 text-xl mt-2">You’ve already rated this product. Thanks!</p>
                    )}
                    <p className='review'>Reviews</p>
                    <p className='description'>{product.productDescription}</p>
                    <div className="btn">
                        {isLogin ? (
                            <button disabled={cartToggle} onClick={() => addToCart(product)} className='bg-blue-600'>{cartToggle ? "Added" : "Add to Cart "}</button>
                        ) : (
                            <button onClick={navigateHandler} className='bg-red-500'>Login</button>
                        )}
                        {
                            isLogin && (
                                <>
                                    <button className='like'>Like</button>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="right">
                    <div className="mainimage">

                        <img src={mainImage || product?.productImageURL?.[0]} alt={product.productName} />
                    </div>
                    <div className="boximage">
                        {
                            product?.productImageURL?.map((url, index) => (
                                <img
                                    onClick={() => handleImageClick(url)}
                                    key={index}
                                    src={url}
                                    alt={`Product view ${index + 1}`}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail