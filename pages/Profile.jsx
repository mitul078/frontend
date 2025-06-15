import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/profile.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogout } from '../features/userSlice'
import axios from '../api/axiosConfig'



const Profile = () => {
  const navigate = useNavigate()
  const [username, setusername] = useState("")

  const [data, setdata] = useState({
    email: "",
    mobile: ""
  })
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setusername(user.name)
    if (user) {
      setdata({
        email: user?.email || "",
        mobile: user?.mobile || ""
      })
    }
    
  }, [])


  const [showEdit, setshowEdit] = useState(false)
  const dataHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const addData = { ...user, email: data.email, mobile: data.mobile };
      localStorage.setItem("user", JSON.stringify(addData))
      await axios.patch(`/users/${user.id}`, {
        email: data.email,
        mobile: data.mobile
      })

      setshowEdit(false);
    } catch (error) {
      console.log(error)
    }
  }



  const handler = () => {
    setshowEdit(!showEdit);
  }
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(setLogout())
    localStorage.removeItem("isLogin")
    localStorage.removeItem("user")
    localStorage.removeItem("isAdmin")
    navigate("/login")
  }
  return (
    <div className='profilepage'>
      <div className="container">
        <div className="left">
          <div className="profile-image">
            <img src="https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg" alt="" />
          </div>
        </div>
        <div className="right">
          <div className="boxes">
            <div className="box">
              <h1>Name</h1>
              <h3>{username}</h3>
            </div>
            <div className="box">
              <h1>Email-id</h1>
              {showEdit ? (
                <input type="email"
                  value={data.email}
                  onChange={(e) => setdata({ ...data, email: e.target.value })}
                />
              ) : (
                <h3>{data.email || "Not set yet"}</h3>
              )}
            </div>
            <div className="box">
              <h1>Mobile-no</h1>
              {showEdit ? (
                <input
                  type='number'
                  value={data.mobile}
                  onChange={(e) => setdata({ ...data, mobile: e.target.value })}
                />
              ) : (
                <h3>{data.mobile || "Not Set Yet"} </h3>
              )}
            </div>

          </div>
          <button onClick={showEdit ? dataHandler : handler}>{showEdit ? "Save" : "Edit"}</button>
          <button onClick={logOutHandler}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
