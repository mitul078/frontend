import React, { useState } from 'react'
import '../styles/createProduct.css'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { addProduct } from '../features/productAction'

const CreateProduct = () => {
    const { register, reset, handleSubmit } = useForm()
    const dispatch = useDispatch();
    const [imageURLs, setImageURLs] = useState([])
    const [currentImageURL, setCurrentImageURL] = useState('')

    const submitHandler = (product) => {
        product.id = nanoid();
        product.productImageURL = imageURLs; 
        dispatch(addProduct(product))
        reset()
        setImageURLs([])
    }

    const addImage = () => {
        if (currentImageURL.trim() && !imageURLs.includes(currentImageURL)) {
            setImageURLs([...imageURLs, currentImageURL])
            setCurrentImageURL('')
        }
    }

    const removeImage = (urlToRemove) => {
        setImageURLs(imageURLs.filter(url => url !== urlToRemove))
    }

    return (
        <div>
            <div className="form-data">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input
                        {...register("productName")}
                        type="text"
                        placeholder='Product Name'
                        required
                    />
                    <textarea
                        {...register("productDescription")}
                        placeholder='Product Description'
                        required
                    />
                    <input
                        {...register("productPrice")}
                        type="number"
                        placeholder='Product Price'
                        required
                    />
                    
                    {/* Image URL Management */}
                    <div className="image-urls-container">
                        <div className="add-image-section">
                            <input
                                type="url"
                                value={currentImageURL}
                                onChange={(e) => setCurrentImageURL(e.target.value)}
                                placeholder='Enter image URL'
                            />
                            <button 
                                type="button"
                                onClick={addImage}
                                className="add-image-btn"
                            >
                                Add 
                            </button>
                        </div>
                        
                        {/* Preview of added images */}
                        <div className="image-previews flex gap-3 ">
                            {imageURLs.map((url, index) => (
                                <div key={index} className="image-preview-item">
                                    <img 
                                        className='w-[5rem] h-[5    rem] rounded-[2rem]'
                                        src={url} 
                                        alt={`Preview ${index}`}
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(url)}
                                        className="remove-image-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type='submit' className='bg-blue-600'>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct