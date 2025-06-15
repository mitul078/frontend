import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../features/userAction';
import { useDispatch } from 'react-redux';
import "../styles/loginpage/style.css"

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const submitHandler = (user) => {
    dispatch(loginUser(user , navigate))
    reset();
  }
  const registerHandler = () =>{
    navigate("/register")
  }
  return (
    <div>
      <div>
        <div className="container">
          <div className="box">
            <form onSubmit={handleSubmit(submitHandler)}>
              <input {...register("name", { required: true })} type="text"  placeholder='[name]' />
              {errors.Name && <span className='text-red-700 text-[1rem]'>Enter Name</span>}
              <p>Don't have an account <span onClick={registerHandler}>Register</span></p>
              <button type='submit'> Sign-in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
