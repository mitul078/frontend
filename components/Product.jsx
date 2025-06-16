import '../styles/product.css'
import productData, { deleteProduct } from '../features/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Product = () => {
  const dispatch = useDispatch();
  const isAdminString = localStorage.getItem("isAdmin")
  const isAdmin = (isAdminString === 'true')
  const products = useSelector((state) => state.products.products)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productData());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Confirm To Delete")) {
      dispatch(deleteProduct(id))
    }
  }

  const navigateHandler = (id) => {
    navigate(`/Product/ProductDetail/${id}`)
  }
  if (!products || products.length === 0) {
    return (
      <div className='productPage'>
        <div className="container">
          <p>Loading .............</p>
        </div>
      </div>
    );
  }

  return (
    <div className='productPage'>
      <div className="container">
        {products.map((product) => (
          <div className="product-box" key={product.id}>
            <div className="image">
              <img src={product.productImageURL[0]} alt={product.productName} />
            </div>
            <div className="productData ">
              <div className="btn">
                <h3>₹{product.productPrice}</h3>
                <button onClick={() => navigateHandler(product.id)}>See more</button>
                {isAdmin ? <button onClick={() => handleDelete(product.id)}>Delete</button> : ""}
              </div>
              <h1>{product.productName}</h1>
              <p>
                Description:
                {product.productDescription
                  ? product.productDescription.slice(0, 50) +
                  (product.productDescription.length > 50 ? ' ..' : '')
                  : 'No description available'}
                {product.productDescription && product.productDescription.length > 50 && (
                  <span className='text-blue-600 cursor-pointer'>more</span>
                )}
              </p>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Product
