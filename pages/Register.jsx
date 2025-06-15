import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux';
import addUserData from '../features/userAction';
import "../styles/registerpage/style.css"


const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.isLogin = false;
    user.Cart = [];
    dispatch(addUserData(user))
    reset();
    navigate("/login")
  }
  return (
    <div>
      <div className="container">
        <div className="box">
          <form onSubmit={handleSubmit(submitHandler)} >
            <input {...register("name", { required: true })} type="text"  placeholder='[name]' />
            {errors.Name && <span className='text-red-700 text-[1rem]'>Enter Name</span>}


            <input {...register("Password", { required: true })} type="password" className='border-b' placeholder='[password]' />
            {errors.Password && <span className='text-red-700 text-[1rem]'>Enter valid password</span>}
            <button type='submit'> sign-up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
