import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/invoice.css';


function Invoice() {
    const location = useLocation();
    const { id } = useParams();
    const { quantity } = location.state || {};
    const user = JSON.parse(localStorage.getItem("user")) || {};


    const [product, setProduct] = useState("");


    const price = product ? Number(product.productPrice) : 0;
    const total = price * (quantity || 0);


    useEffect(() => {


        const getData = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);

            }
        };
        getData();
    }, []);
    const navigate = useNavigate(id);
    const navigateHandler = () => {
        navigate(`/Checkout/${id}/final`)
    }

    return (
        <div className='invoice'>
            <div className="invoice-container" >
                <div className="invoice-header">
                    <div className="invoice-left">
                        <h1>INVOICE</h1>
                        <div className="invoice-meta">
                            <h2>Invoice #: {Math.floor(Math.random() * 1000)}</h2>
                            <h3>Date: {new Date().toLocaleDateString()}</h3>
                        </div>
                    </div>
                    <div className="invoice-right">
                        <h2>BILL TO:</h2>
                        <p>{user.name || 'Customer'}</p>
                        {user.address && <p>{user.address}</p>}
                        {user.mobile && <p>Phone: {user.mobile}</p>}
                        {user.email && <p>Email: {user.email}</p>}
                    </div>
                </div>

                <div className="invoice-info">
                    <div className="invoice-data">
                        <div className="data-1">
                            <h3>Description</h3>
                        </div>
                        <div className="data-2">
                            <h3>Qty</h3>
                            <h3>Unit Price</h3>
                            <h3>Amount</h3>
                        </div>
                    </div>

                    <div className="invoice-detail">
                        <div className="data-1">
                            <p>{product.productName}</p>
                        </div>
                        <div className="data-2">
                            <p>{quantity}</p>
                            <p>${price.toFixed(2)}</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="invoice-total">
                        <h2>TOTAL: ${total.toFixed(2)}</h2>
                    </div>
                    <div className="invoice-actions  flex gap-3">
                        <button className='bg-blue-600' onClick={() => navigateHandler(user.id)}>Continue</button>
                        <button className='bg-blue-600'>Download Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice;